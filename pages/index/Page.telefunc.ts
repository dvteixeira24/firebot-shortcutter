import { type DeckConfig, type Store, store } from "@/lib/store";

export const onGetDeckList = async () => {
  const deckList = await store.getData("/decks");
  return deckList as Store["decks"];
};

export const onCreateDeck = async (data: DeckConfig) => {
  const id = crypto.randomUUID();
  const dbData: Store["decks"]["id"] = {
    deckActions: {},
    deckConfig: data,
  };
  store.push(`/decks/${id}`, dbData, true);
  return dbData;
};
