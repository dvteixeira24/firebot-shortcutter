import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { type PresetAction } from "@/lib/store";
import { Input } from "@/components/ui/input";
import ActionButton from "../../../../../components/ActionButton";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { onGetPresetEffectsList } from "../Page.telefunc";
import { IconChevronLeft } from "@tabler/icons-react";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { onAddActionButton } from "./Page.telefunc";
import { usePageContext } from "vike-react/usePageContext";

const DEFAULT_IMAGE = null;

export function Page() {
  const pageContext = usePageContext();
  const form = useForm({
    defaultValues: {
      presetId: "" as string,
      icon: "" as string,
      color: "stone" as PresetAction["color"],
      label: "" as string,
      args: {} as Record<string, any>,
    },
  });

  const { data: presetsList } = useSuspenseQuery({
    queryKey: ["presetEffects"],
    queryFn: () => onGetPresetEffectsList(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: onAddActionButton,
    onSuccess: () => {
      window.location.href = "/deck/" + pageContext.routeParams.id;
    },
  });

  const imageReaderRef = useRef<FileReader | null>(null);

  const { presetId, icon, color, label } = form.watch();

  const currentPreset = Object.values(presetsList).find((preset) => preset.id === presetId);

  useEffect(() => {
    imageReaderRef.current = new FileReader();
    imageReaderRef.current.addEventListener("load", (ev) => {
      form.setValue("icon", ev.target?.result as string);
    });
  }, [form]);

  const onSubmit = () => {
    if (form.getValues() && currentPreset) {
      mutateAsync({ data: form.getValues(), deckId: pageContext.routeParams.id });
    }
  };

  return (
    <div className="px-6 pt-6">
      <div className="flex flex-row gap-4 align-middle border-b-2 mb-4">
        <h1 className="text-3xl font-bold mb-4">Add a quick Action</h1>
      </div>
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-4 mb-4" onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="text-lg">Preset Config</h2>
            <FormField
              control={form.control}
              name="presetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effect Preset To Run</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(presetsList).map((preset) => {
                          return (
                            <SelectItem key={preset.id} value={preset.id}>
                              {preset.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>The firebot effect preset to run</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues("presetId") && (
              <>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem hidden={!Object.keys({ ...currentPreset?.args }).length} value="args">
                    <AccordionTrigger>ARGUMENTS</AccordionTrigger>
                    <AccordionContent className="px-2">
                      <div>
                        {currentPreset?.args.map((name) => {
                          return (
                            <FormField
                              key={name}
                              control={form.control}
                              name={`args.${name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{name}</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <h2 className="text-lg pt-4 mt-4">Customize Tile</h2>
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action icon</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          max="1"
                          disabled={field.disabled}
                          name={field.name}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          onChange={(ev) => {
                            ev.preventDefault();
                            //
                            const file = ev.currentTarget.files?.item(0);
                            if (file) {
                              imageReaderRef.current?.readAsDataURL(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>Icon to display</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Color</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="h-16">
                            <SelectValue
                              style={{
                                color: `var(--color-${field.value}-500)`,
                              }}
                              placeholder="stone"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              [
                                "amber",
                                "blue",
                                "cyan",
                                "emerald",
                                "fuchsia",
                                "gray",
                                "green",
                                "indigo",
                                "lime",
                                "neutral",
                                "orange",
                                "pink",
                                "purple",
                                "red",
                                "rose",
                                "sky",
                                "slate",
                                "stone",
                                "teal",
                                "violet",
                                "yellow",
                                "zinc",
                              ] as PresetAction["color"][]
                            ).map((color) => {
                              // a swatch
                              return (
                                <SelectItem
                                  //   style={{
                                  //     background: `var(--color-${color}-500)`,
                                  //   }}
                                  className="mb-2 last-of-type:mb-0 cursor-pointer h-12"
                                  key={color}
                                  value={color}
                                >
                                  <div
                                    className="text-lg py-1 px-3 rounded-xl"
                                    style={{
                                      background: `var(--color-${color}-500)`,
                                    }}
                                  >
                                    <span className="text-white">{color}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Icon to display</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Text label to show underneath the icon</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h3>Preview:</h3>
                <div className="size-[256px] pointer-events-none">
                  <ActionButton
                    columnsFactor={2}
                    icon={icon || DEFAULT_IMAGE}
                    label={label}
                    color={color}
                    presetId=""
                  />
                </div>
                <Button className="w-full h-16">Add</Button>
              </>
            )}
          </form>
          <Button className="w-full mb-8" variant="outline" color="red" asChild>
            <a href={"/deck/" + pageContext.routeParams.id}>
              <IconChevronLeft /> Cancel
            </a>
          </Button>
        </Form>
      </div>
    </div>
  );
}
