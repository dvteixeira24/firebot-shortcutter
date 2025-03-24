import { Store, store } from "@/lib/store";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { shield } from "telefunc";
const t = shield.type;

export const onGetConfig = shield([t.string], async (deckId: string) => {
  const deckConfig = (await store.getData(`/decks/${deckId}/deckConfig`)) as Store["decks"]["id"]["deckConfig"];
  return deckConfig;
});

export const onGetDeckActions = shield([t.string], async (deckId: string) => {
  const deckActions = await store.getData(`/decks/${deckId}/deckActions`);
  return deckActions as Store["decks"]["id"]["deckActions"];
});

export const onGetPresetEffectsList = async () =>
  JSON.parse(
    readFileSync(resolve(process.env.FIREBOT_DATA_DIR, "effects", "preset-effect-lists.json")).toString(),
  ) as FirebotConfigData.json.PresetList;
