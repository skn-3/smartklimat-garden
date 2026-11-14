import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { fetchHubCorrections, fetchHubItem, fetchHubList } from "./api.server";
import {
  isHubRequestAllowed,
  type HubCorrectionListItem,
  type HubItem,
  type HubListItem,
} from "./model";

export type HubListResult = { status: "ok"; items: HubListItem[] } | { status: "error"; items: [] };

export type HubItemResult =
  | { status: "ok"; item: HubItem }
  | { status: "not_found" }
  | { status: "error" };

export type HubCorrectionsResult =
  | { status: "ok"; items: HubCorrectionListItem[] }
  | { status: "error"; items: [] };

export const getHubAccess = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  return isHubRequestAllowed(request.headers.get("host") ?? new URL(request.url).host);
});

export const getHubList = createServerFn({ method: "POST" })
  .inputValidator(z.object({ before: z.string().nullable() }))
  .handler(async ({ data }): Promise<HubListResult> => {
    try {
      const items = await fetchHubList(data.before);
      return { status: "ok", items };
    } catch (error) {
      console.error("Kunde inte hämta SmartKlimat Idag", error);
      return { status: "error", items: [] };
    }
  });

export const getHubItem = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string().min(1).max(240) }))
  .handler(async ({ data }): Promise<HubItemResult> => {
    try {
      const item = await fetchHubItem(data.slug);
      return item ? { status: "ok", item } : { status: "not_found" };
    } catch (error) {
      console.error("Kunde inte hämta text från SmartKlimat Idag", error);
      return { status: "error" };
    }
  });

export const getHubCorrections = createServerFn({ method: "GET" }).handler(
  async (): Promise<HubCorrectionsResult> => {
    try {
      const items = await fetchHubCorrections();
      return { status: "ok", items };
    } catch (error) {
      console.error("Kunde inte hämta rättelser", error);
      return { status: "error", items: [] };
    }
  },
);
