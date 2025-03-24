import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { IconBorderCorners, IconCheck, IconMenu, IconPlus, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import { usePageContext } from "vike-react/usePageContext";
import { Separator } from "./ui/separator";
import DeckSwitcher from "./DeckSwitcher";

export default function Menu() {
  const pageContext = usePageContext();
  const [isWakeLock, setIsWakeLock] = useState(false);

  const { isSupported, request, release } = useWakeLock({
    onRequest: () => setIsWakeLock(true),
    onError: () => alert("Couldn't request Wake Lock to keep screen on"),
    onRelease: () => setIsWakeLock(false),
  });

  return (
    <div className="fixed backdrop-blur-sm bg-foreground/10 bottom-0 pt-2 pb-2 right-0 px-4 z-10 flex gap-8 w-screen overflow-hidden">
      <div className="grow">
        <DeckSwitcher />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <IconMenu />
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={16} className="flex flex-col gap-4">
          <Button variant={"default"} asChild>
            <a href={`/deck/${pageContext.routeParams.id}/add`}>
              <IconPlus />
              Add Quick Action
            </a>
          </Button>
          <Button asChild>
            <a href={"/deck/" + pageContext.routeParams.id + "/edit"}>
              {" "}
              <IconSettings />
              Deck settings
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={"/"}>View all decks</a>
          </Button>
          <Separator />
          <h2>Display Settings</h2>
          <Button
            onClick={(ev) => {
              ev.preventDefault();
              const mainElement = document.querySelector("html");
              mainElement?.requestFullscreen();
            }}
            variant="outline"
          >
            <IconBorderCorners /> Request Fullscreen
          </Button>
          {isSupported && (
            <Toggle
              aria-label="Keep screen awake"
              onPressedChange={(pressed) => {
                if (pressed) {
                  request();
                } else {
                  release();
                }
              }}
              pressed={isWakeLock}
              variant={"default"}
            >
              {isWakeLock && <IconCheck />}
              Keep screen awake
            </Toggle>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
