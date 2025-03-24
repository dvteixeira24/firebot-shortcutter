import { store } from "@/lib/store";
import { PageContext } from "vike/types";

export default function data(pageContext: PageContext) {
  return store.getData("/decks/" + pageContext.routeParams.id + "/deckConfig");
}
