import { z } from "zod";
import { HUB_LIVE } from "./config.ts";

const isoDate = z
  .string()
  .min(1)
  .refine((value) => Number.isFinite(Date.parse(value)), {
    message: "Ogiltigt datum",
  });

export const hubSourceSchema = z.object({
  title: z.string().catch(""),
  publisher: z.string().catch(""),
  date: z.string().catch(""),
  url: z.string().nullable().catch(null),
});

const hubSourcesSchema = z
  .array(hubSourceSchema)
  .nullish()
  .transform((sources) => sources ?? []);

export const hubPictureSchema = z.object({
  id: z.string().uuid(),
  alt: z.string(),
  format: z.enum(["lank", "flode", "story"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  version: z.union([z.string(), z.number()]),
});

const hubPicturesSchema = z
  .array(hubPictureSchema.nullable().catch(null))
  .catch([])
  .transform((pictures) => pictures.filter((picture): picture is HubPicture => picture !== null));

export const hubListItemSchema = z.object({
  slug: z.string().min(1),
  kind: z.enum(["notis", "artikel"]),
  series: z.string().nullable(),
  headline: z.string(),
  lead: z.string(),
  body: z.string().nullable(),
  source_line: z.string().nullable().optional().default(null),
  sources: hubSourcesSchema,
  published_at: isoDate,
  corrected: z.boolean(),
  picture: hubPictureSchema.nullable().catch(null),
});

export const hubCorrectionSchema = z.object({
  at: isoDate,
  text: z.string(),
});

export const hubItemSchema = z.object({
  slug: z.string().min(1),
  kind: z.enum(["notis", "artikel"]),
  series: z.string().nullable(),
  headline: z.string(),
  lead: z.string(),
  body: z.string().nullable(),
  source_line: z.string().nullable(),
  published_at: isoDate,
  updated_at: isoDate.nullable(),
  sources: hubSourcesSchema,
  pictures: hubPicturesSchema,
  corrections: z.array(hubCorrectionSchema),
});

export const hubCorrectionListItemSchema = z.object({
  at: isoDate,
  text: z.string(),
  kind: z.enum(["rattelse", "borttagen"]),
  headline: z.string(),
  slug: z.string().nullable(),
});

export const hubListSchema = z.array(z.unknown()).transform((items, context) => {
  const parsedItems = items.flatMap((item) => {
    const parsed = hubListItemSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });

  if (items.length > 0 && parsedItems.length === 0) {
    context.addIssue({ code: "custom", message: "Inga poster i listan kunde tolkas" });
    return z.NEVER;
  }

  return parsedItems;
});
export const hubCorrectionsSchema = z.array(hubCorrectionListItemSchema);
export const hubItemResponseSchema = hubItemSchema.nullable();
export const hubPicturePathSchema = z.string().min(1).max(1024).nullable();

export type HubSource = z.infer<typeof hubSourceSchema>;
export type HubPicture = z.infer<typeof hubPictureSchema>;
export type HubListItem = z.infer<typeof hubListItemSchema>;
export type HubItem = z.infer<typeof hubItemSchema>;
export type HubCorrectionListItem = z.infer<typeof hubCorrectionListItemSchema>;

export type HubBodyBlock = { type: "heading"; text: string } | { type: "paragraph"; text: string };

export function parseHubBody(body: string | null): HubBodyBlock[] {
  if (!body) return [];

  return body
    .split(/\r?\n\s*\r?\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      block.startsWith("## ")
        ? { type: "heading", text: block.slice(3).trim() }
        : { type: "paragraph", text: block },
    );
}

export function safeHubSourceUrl(value: string | null): string | null {
  if (!value) return null;
  const candidate = value.trim();
  if (!/^https?:\/\//i.test(candidate)) return null;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? candidate : null;
  } catch {
    return null;
  }
}

export function normalizeHubPictureId(value: string): string | null {
  const id = value.endsWith(".png") ? value.slice(0, -4) : value;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ? id : null;
}

export function isHubRequestAllowed(host: string | null, hubLive = HUB_LIVE): boolean {
  if (hubLive) return true;
  if (!host || !/^[a-z0-9.-]+(?::\d{1,5})?$/i.test(host)) return false;

  let hostname: string;
  try {
    hostname = new URL(`http://${host}`).hostname.toLowerCase().replace(/\.$/, "");
  } catch {
    return false;
  }

  if (hostname === "localhost") return true;
  if (/^id-preview--[a-z0-9-]+\.lovable\.app$/.test(hostname)) return true;
  return hostname.endsWith(".lovableproject.com") && hostname !== "lovableproject.com";
}

export function hubPictureUrl(picture: HubPicture): string {
  return `/idag/bild/${picture.id}.png?v=${encodeURIComponent(String(picture.version))}`;
}
