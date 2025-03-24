import { Button } from "@/components/ui/button";

import { useSuspenseQuery } from "@tanstack/react-query";
import { onGetDeckActions, onGetPresetEffectsList, onGetConfig } from "./Page.telefunc";

import { clientOnly } from "vike-react/clientOnly";
import { usePageContext } from "vike-react/usePageContext";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { IconPlus } from "@tabler/icons-react";

import { Skeleton } from "@/components/ui/skeleton";

const ActionButton = clientOnly(() => import("@/components/ActionButton"));
const Menu = clientOnly(() => import("@/components/Menu"));

export default function Page() {
  const pageContext = usePageContext();
  const { data: deckActions } = useSuspenseQuery({
    queryKey: ["deckActions", pageContext.routeParams.id],
    queryFn: () => onGetDeckActions(pageContext.routeParams.id),
  });

  const { data: deckConfig } = useSuspenseQuery({
    queryKey: ["config", pageContext.routeParams.id],
    queryFn: () => onGetConfig(pageContext.routeParams.id),
  });

  const { data: presetsList } = useSuspenseQuery({
    queryKey: ["firebasePresetEffects"],
    queryFn: () => onGetPresetEffectsList(),
  });

  return (
    <>
      <Menu />
      <div
        style={{
          gridTemplateColumns: `repeat(${deckConfig.columns}, minmax(0, 1fr))`,
        }}
        className="grid gap-6"
      >
        {deckActions && presetsList && (
          <>
            {Object.entries(deckActions)
              .toSorted(([aID], [bID]) => {
                // Use deckConfig.tileOrder (string of ids to determine the order)
                const order = deckConfig.tileOrder; // Assuming it's a comma-separated string of ids.

                const indexA = order.indexOf(aID);
                const indexB = order.indexOf(bID);

                if (indexA === -1 || indexB === -1) {
                  throw new Error("Action ID not found in tileOrder");
                }

                return indexA - indexB; // Return negative, zero, or positive based on the order.
              })
              .map(([key, action]) => {
                const matchingPreset = Object.values(presetsList).find((preset) => preset.id === action.presetId);
                if (!matchingPreset) {
                  throw new Error("Preset not found in firebot config");
                }
                return (
                  <AspectRatio key={key} ratio={1}>
                    <ActionButton
                      fallback={<Skeleton className="size-full" />}
                      key={key}
                      columnsFactor={deckConfig.columns}
                      {...action}
                    />
                  </AspectRatio>
                );
              })}
          </>
        )}
        <AspectRatio ratio={1}>
          <Button asChild variant={"outline"} className="h-full w-full">
            <a href={`/deck/${pageContext.routeParams.id}/add`}>
              <IconPlus />
            </a>
          </Button>
        </AspectRatio>
      </div>
    </>
  );
}
