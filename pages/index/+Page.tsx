import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { onCreateDeck, onGetDeckList } from "./Page.telefunc";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Store } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { IconMoodSad, IconSettings2 } from "@tabler/icons-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [isAddingDeck, setIsAddingDeck] = useState(false);

  const { data: decks, refetch } = useSuspenseQuery({
    queryKey: ["deckList"],
    queryFn: () => onGetDeckList(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: onCreateDeck,
    onSuccess: () => {
      refetch();
      setIsAddingDeck(false);
    },
    onError: () => {
      toast.error("Failed to add.");
    },
  });
  const form = useForm({
    defaultValues: {
      name: "New Deck " + new Date().toLocaleDateString("en-US"),
      columns: 2,
      color: "slate",
      tileOrder: [],
    } as Store["decks"]["id"]["deckConfig"],
  });

  const onSubmit = (values: Store["decks"]["id"]["deckConfig"]) => mutateAsync(values);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 align-middle border-b-2 mb-4">
        <h1 className="text-3xl font-bold mb-4">FireBot Shortcutter</h1>
      </div>
      <Card className="p-4 space-y-2">
        <CardTitle>Your decks</CardTitle>
        <CardContent className="flex flex-col gap-2 items-center p-2">
          {Object.entries(decks).length ? (
            Object.entries(decks).map(([id, deck]) => {
              return (
                <div key={id} className="flex gap-2 w-full overflow-x-hidden">
                  <Button asChild className="grow min-h-16 h-min text-lg text-wrap">
                    <a href={`/deck/${id}`}>{deck.deckConfig.name}</a>
                  </Button>
                  <Button asChild className="size-16">
                    <a href={`/deck/${id}/edit`}>
                      <IconSettings2 className="!size-8" />
                    </a>
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <IconMoodSad /> <span className="text-lh">No decks yet</span>
            </div>
          )}
        </CardContent>
      </Card>
      <Drawer open={isAddingDeck} onOpenChange={setIsAddingDeck}>
        <DrawerTrigger asChild>
          <Button className="self-end">Add a new deck</Button>
        </DrawerTrigger>
        <DrawerContent>
          <Form {...form}>
            <DrawerHeader>
              <DrawerTitle>Add a new deck</DrawerTitle>
              <DrawerDescription>Enter deck name and choose column count (you can change this later)</DrawerDescription>
            </DrawerHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deck Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" minLength={1} required />
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
              <Button>Add</Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
