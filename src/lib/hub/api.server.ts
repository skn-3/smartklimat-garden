import type { z } from "zod";
import { HUB_API, HUB_COMPANY, HUB_KEY } from "./config";
import {
  hubCorrectionsSchema,
  hubItemResponseSchema,
  hubListSchema,
  hubPicturePathSchema,
} from "./model";

const TIMEOUT_MS = 5_000;

function apiBase(): string {
  const override = process.env["HUB_API_OVERRIDE"]?.trim();
  return (override || HUB_API).replace(/\/+$/, "");
}

async function requestWithTimeout(input: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function postHub<Schema extends z.ZodType>(
  fn: string,
  args: Record<string, unknown>,
  schema: Schema,
): Promise<z.infer<Schema>> {
  const response = await requestWithTimeout(`${apiBase()}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: HUB_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Redaktionen svarade med status ${response.status}`);
  const payload: unknown = await response.json();
  return schema.parse(payload);
}

export async function fetchHubList(before: string | null) {
  return postHub(
    "hub_public_list",
    { _company: HUB_COMPANY, _limit: 20, _before: before },
    hubListSchema,
  );
}

export async function fetchHubItem(slug: string) {
  return postHub("hub_public_item", { _company: HUB_COMPANY, _slug: slug }, hubItemResponseSchema);
}

export async function fetchHubCorrections() {
  return postHub("hub_public_corrections", { _company: HUB_COMPANY }, hubCorrectionsSchema);
}

export async function fetchHubPicture(id: string): Promise<Response | null> {
  const path = await postHub("hub_public_picture", { _id: id }, hubPicturePathSchema);
  if (!path) return null;

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0 || segments.some((segment) => segment === "." || segment === "..")) {
    return null;
  }

  const encodedPath = segments.map((segment) => encodeURIComponent(segment)).join("/");
  const response = await requestWithTimeout(
    `${apiBase()}/storage/v1/object/library/${encodedPath}`,
    {
      method: "GET",
      headers: { apikey: HUB_KEY },
      redirect: "error",
      cache: "no-store",
    },
  );

  if (!response.ok || !response.body) return null;
  return response;
}
