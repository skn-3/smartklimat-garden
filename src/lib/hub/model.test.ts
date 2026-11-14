import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { HUB_LIVE } from "./config.ts";
import {
  hubCorrectionsSchema,
  hubItemResponseSchema,
  hubListSchema,
  hubPicturePathSchema,
  isHubRequestAllowed,
  normalizeHubPictureId,
  parseHubBody,
  safeHubSourceUrl,
} from "./model.ts";

const listItem = {
  slug: "skogen-vaxer",
  kind: "notis",
  series: "Dagens framsteg",
  headline: "Skogen växer",
  lead: "En kort ingress",
  body: "Brödtext",
  source_line: "Källa: Naturvårdsverket",
  sources: [],
  published_at: "2026-11-17T06:00:00Z",
  corrected: false,
  picture: null,
};

describe("hubbens värdspärr", () => {
  it("är avstängd tills den uttryckligen aktiveras", () => {
    assert.equal(HUB_LIVE, false);
  });

  it("nekar publika och okända värdnamn som standard", () => {
    for (const host of [
      "smartklimat.org",
      "www.smartklimat.org",
      "smartklimat.lovable.app",
      "example.com",
      "",
      "okänd.example",
    ]) {
      assert.equal(isHubRequestAllowed(host, false), false, host);
    }
    assert.equal(isHubRequestAllowed(null, false), false);
  });

  it("tillåter bara angivna förhandsvisningar och localhost när hubben är avstängd", () => {
    assert.equal(isHubRequestAllowed("localhost:8080", false), true);
    assert.equal(
      isHubRequestAllowed("id-preview--dd3ffd04-bac7-4ca7-9581-b29f87dd79e4.lovable.app", false),
      true,
    );
    assert.equal(isHubRequestAllowed("foo.lovableproject.com", false), true);
    assert.equal(isHubRequestAllowed("smartklimat.lovable.app.evil.example", false), false);
    assert.equal(isHubRequestAllowed("lovableproject.com", false), false);
  });

  it("släpper genom värdnamn när hubben är påslagen", () => {
    assert.equal(isHubRequestAllowed("smartklimat.org", true), true);
    assert.equal(isHubRequestAllowed(null, true), true);
  });
});

describe("brödtext", () => {
  it("tolkar stycken och underrubriker men ingen HTML", () => {
    assert.deepEqual(
      parseHubBody("Första stycket.\n\n## En rubrik\n\nAndra <img src=x> stycket."),
      [
        { type: "paragraph", text: "Första stycket." },
        { type: "heading", text: "En rubrik" },
        { type: "paragraph", text: "Andra <img src=x> stycket." },
      ],
    );
    assert.deepEqual(parseHubBody(null), []);
  });
});

describe("svarsvalidering", () => {
  it("accepterar giltiga listor, texter, rättelser och bildsökvägar", () => {
    assert.equal(hubListSchema.safeParse([listItem]).success, true);
    const {
      sources: _sources,
      source_line: _sourceLine,
      ...articleWithoutNoticeFields
    } = { ...listItem, kind: "artikel", body: null };
    assert.equal(hubListSchema.safeParse([articleWithoutNoticeFields]).success, true);
    assert.equal(
      hubItemResponseSchema.safeParse({
        ...listItem,
        updated_at: null,
        pictures: [],
        corrections: [],
      }).success,
      true,
    );
    assert.equal(hubItemResponseSchema.safeParse(null).success, true);
    assert.equal(
      hubCorrectionsSchema.safeParse([
        {
          at: "2026-11-17T06:00:00Z",
          text: "Siffran är ändrad.",
          kind: "rattelse",
          headline: "Skogen växer",
          slug: "skogen-vaxer",
        },
      ]).success,
      true,
    );
    assert.equal(hubPicturePathSchema.safeParse("company/picture.png").success, true);
  });

  it("stoppar ofullständiga eller felaktiga svar", () => {
    assert.equal(hubListSchema.safeParse([{ ...listItem, headline: 42 }]).success, false);
    assert.equal(hubListSchema.safeParse({ items: [listItem] }).success, false);
    assert.equal(hubItemResponseSchema.safeParse({ ...listItem, updated_at: null }).success, false);
    assert.equal(hubPicturePathSchema.safeParse({ path: "picture.png" }).success, false);
  });
});

describe("källänkar", () => {
  it("tillåter bara http och https", () => {
    assert.equal(safeHubSourceUrl("https://example.com/kalla"), "https://example.com/kalla");
    assert.equal(safeHubSourceUrl("http://example.com"), "http://example.com");
    for (const value of [
      null,
      "/lokal",
      "javascript:alert(1)",
      "data:text/html,x",
      "ftp://example.com",
    ]) {
      assert.equal(safeHubSourceUrl(value), null);
    }
  });
});

describe("bildadressens uuid", () => {
  it("accepterar uuid med eller utan png och nekar allt annat", () => {
    const id = "123e4567-e89b-42d3-a456-426614174000";
    assert.equal(normalizeHubPictureId(id), id);
    assert.equal(normalizeHubPictureId(`${id}.png`), id);
    assert.equal(
      normalizeHubPictureId("018f3c5c-7c8a-7def-9abc-1234567890ab"),
      "018f3c5c-7c8a-7def-9abc-1234567890ab",
    );
    for (const value of ["", "abc", `${id}.jpg`, `../${id}`, `${id}.png.png`]) {
      assert.equal(normalizeHubPictureId(value), null);
    }
  });
});
