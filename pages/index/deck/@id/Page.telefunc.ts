import { Store, store } from "@/lib/store";

import { shield } from "telefunc";
const t = shield.type;
const FIREBOT_API_URL = process.env.FIREBOT_API_URL || "http://localhost:7472/";

export const onGetConfig = shield([t.string], async (deckId: string) => {
  const deckConfig = (await store.getData(`/decks/${deckId}/deckConfig`)) as Store["decks"]["id"]["deckConfig"];
  return deckConfig;
});

export const onGetDeckActions = shield([t.string], async (deckId: string) => {
  const deckActions = await store.getData(`/decks/${deckId}/deckActions`);
  return deckActions as Store["decks"]["id"]["deckActions"];
});

export const onGetPresetEffectsList = async () =>
  (await (await fetch(FIREBOT_API_URL + "effects/preset")).json()) as FirebotApiData.Preset[];
