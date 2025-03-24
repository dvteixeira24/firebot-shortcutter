import { DeckConfig, store } from "@/lib/store";

export const onUpdateDeckConfig = async (deckId: string, data: DeckConfig & { tilesToDelete: string[] }) => {
  const { tilesToDelete, ...config } = data;
  if (tilesToDelete.length > 0) {
    tilesToDelete.forEach((id) => {
      store.delete(`/decks/${deckId}/deckActions/${id}`);
    });
    config.tileOrder = config.tileOrder.filter((id) => !tilesToDelete.includes(id));
  }
  store.push(`/decks/${deckId}/deckConfig`, config);
  return data;
};

export const onDeleteDeck = (deckId: string) => {
  return store.delete(`/decks/${deckId}`);
};
