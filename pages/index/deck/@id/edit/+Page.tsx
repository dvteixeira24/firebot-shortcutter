import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { DeckConfig, Store } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { onDeleteDeck, onUpdateDeckConfig } from "./Page.telefunc";
import { usePageContext } from "vike-react/usePageContext";
import { useData } from "vike-react/useData";
import { useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
import { onGetDeckActions } from "../Page.telefunc";

import { LucideLoaderCircle } from "lucide-react";
import Draggable from "@/components/Draggable";
import { Switch } from "@/components/ui/switch";

const ReorderGroup = clientOnly(async () => (await import("motion/react")).Reorder.Group);

export function Page() {
  const pageContext = usePageContext();
  const data = useData() as DeckConfig;

  const [deleteClickCount, setDeleteClickCount] = useState(0);
  const [reordering, setReordering] = useState(false);

  const form = useForm({
    defaultValues: {
      name: data.name,
      columns: data.columns,
      color: data.color,
      tileOrder: data.tileOrder,
      tilesToDelete: [] as string[],
    } as Store["decks"]["id"]["deckConfig"] & { tilesToDelete: string[] },
  });

  const { data: deckActions } = useSuspenseQuery({
    queryKey: ["deckActions", pageContext.routeParams.id],
    queryFn: () => onGetDeckActions(pageContext.routeParams.id),
  });

  const { mutateAsync: updateDeckConfig } = useMutation({
    mutationFn: ({ deckId, data }: { deckId: string; data: DeckConfig & { tilesToDelete: string[] } }) =>
      onUpdateDeckConfig(deckId, data),
    onSuccess: () => {
      window.location.href = "/deck/" + pageContext.routeParams.id;
    },
  });

  const { mutateAsync: deleteDeck } = useMutation({
    mutationFn: ({ deckId }: { deckId: string }) => onDeleteDeck(deckId),
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const onSubmit = () => {
    if (form.getValues()) {
      updateDeckConfig({
        data: { ...form.getValues(), columns: Number(form.getValues("columns")) },
        deckId: pageContext.routeParams.id,
      });
    }
  };

  const onDeleteClick = () => {
    if (deleteClickCount === 0) {
      setDeleteClickCount(1);
    } else {
      deleteDeck({ deckId: pageContext.routeParams.id });
    }
  };

  const tileOrder = form.watch("tileOrder");
  const tilesToDelete = form.watch("tilesToDelete");

  return (
    <div className="px-6 pt-6">
      <div className="flex flex-row gap-4 align-middle border-b-2 mb-4">
        <h1 className="text-3xl font-bold mb-4">Editing deck</h1>
      </div>
      <div className="flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Name</FormLabel>
                  <FormControl>
                    <Input {...field} minLength={1} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="columns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Columns</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} max={99} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {Object.keys(deckActions).length > 0 && (
              <>
                <div className="flex gap-4">
                  <h2 className="font-bold">Reorder/Remove Tiles</h2>
                  <Switch
                    aria-label="Reoder or Remove Tiles"
                    checked={reordering}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        form.setValue("tileOrder", data.tileOrder);
                        form.setValue("tilesToDelete", []);
                      }
                      setReordering(checked);
                    }}
                  />
                </div>
                {reordering && (
                  <>
                    <p>Tap to delete, tap-and-drag to reorder</p>
                    <div className="mx-8 mt-8">
                      <ReorderGroup
                        fallback={
                          <div className="w-full grid place-items-center py-8">
                            <LucideLoaderCircle size={48} className="animate-spin" />
                          </div>
                        }
                        axis="y"
                        onReorder={(value) => {
                          // @ts-expect-error its going to be string[] dw
                          form.setValue("tileOrder", value);
                        }}
                        values={tileOrder}
                      >
                        {tileOrder
                          .filter((id) => !tilesToDelete.includes(id))
                          .map((quickActionId) => {
                            return (
                              <Draggable
                                handleMarkForDeletion={(id: string) => {
                                  if (tilesToDelete.includes(id)) {
                                    form.setValue(
                                      "tilesToDelete",
                                      tilesToDelete.filter((t) => t !== id),
                                    );
                                  } else {
                                    form.setValue("tilesToDelete", Array.from(new Set([...tilesToDelete, id])));
                                  }
                                }}
                                deckActions={deckActions}
                                quickActionId={quickActionId}
                                key={quickActionId}
                              />
                            );
                          })}
                      </ReorderGroup>
                    </div>
                  </>
                )}
              </>
            )}

            <Button className="h-16">Save</Button>
            <Button variant="outline" type="button" asChild className="h-16">
              <a href={`/deck/${pageContext.routeParams.id}`}>Cancel</a>
            </Button>
          </form>
          <Button className="mt-4 self-end" variant={"destructive"} onClick={onDeleteClick}>
            {deleteClickCount === 0 ? "Delete Deck" : "Are you sure? Click again to confirm"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
