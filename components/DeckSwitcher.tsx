import { onGetDeckList } from "@/pages/index/Page.telefunc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "vike-react/usePageContext";
import { Button } from "./ui/button";
import { IconChevronRight } from "@tabler/icons-react";

export default function DeckSwitcher() {
  const pageContext = usePageContext();
  const { data: decks, refetch } = useSuspenseQuery({
    queryKey: ["deckList"],
    queryFn: () => onGetDeckList(),
  });

  return (
    <>
      <div
        className="flex gap-2"
        style={{
          maxWidth: `calc(100dvw - 64px)`,
        }}
      >
        <Button
          size="icon"
          className="min-w-10"
          onClick={() => {
            const nextId = Object.keys(decks).at(Object.keys(decks).indexOf(pageContext.routeParams.id) + 1);
            window.location.href = `/deck/${nextId}`;
          }}
        >
          <IconChevronRight className="rotate-180" />
        </Button>
        <p className="h-6 my-auto line-clamp-1 text-foreground ">
          {decks[pageContext.routeParams.id]?.deckConfig.name}
        </p>
        <Button
          size="icon"
          className="min-w-10"
          onClick={() => {
            const nextId = Object.keys(decks).at(Object.keys(decks).indexOf(pageContext.routeParams.id) - 1);
            window.location.href = `/deck/${nextId}`;
          }}
        >
          <IconChevronRight />
        </Button>
      </div>
    </>
  );
}
