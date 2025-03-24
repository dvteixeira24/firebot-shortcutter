import { PresetAction, store, type TailwindColor } from "@/lib/store";

import { shield } from "telefunc";
const t = shield.type;

export const onAddActionButton = shield(
  [
    {
      data: { args: t.optional(t.any), icon: t.string, label: t.string, color: t.string, presetId: t.string },
      deckId: t.string,
    },
  ],
  async (opt) => {
    const id = crypto.randomUUID();
    const dbData: Partial<PresetAction> = {
      icon: opt.data.icon,
      presetId: opt.data.presetId,
      label: opt.data.label,
      color: opt.data.color as TailwindColor,
    };
    if (opt.data.args) {
      dbData.args = opt.data.args;
    }
    store.push(`/decks/${opt.deckId}/deckActions/${id}`, dbData, true);
    const currentTileOrder = (await store.getData(`/decks/${opt.deckId}/deckConfig/tileOrder`)) as string[];
    store.push(`/decks/${opt.deckId}/deckConfig/tileOrder`, [...currentTileOrder, id], true);
    return opt.data;
  },
);
