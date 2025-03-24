import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PresetAction } from "@/lib/store";
import { PopoverAnchor, PopoverPortal } from "@radix-ui/react-popover";
import { IconMenu2, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { clientOnly } from "vike-react/clientOnly";
import { Button } from "./ui/button";
import { useDragControls } from "motion/react";

const ReorderItem = clientOnly(async () => (await import("motion/react")).Reorder.Item);

export default function Draggable({
  quickActionId,
  deckActions,
  handleMarkForDeletion,
}: {
  quickActionId: string;
  deckActions: {
    [id: string]: PresetAction;
  };
  handleMarkForDeletion: (quickActionId: string) => void;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const controls = useDragControls();
  return (
    <Popover modal open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <ReorderItem
          // onTap={() => {
          //   setPopoverOpen((prev) => !prev);
          // }}
          id={quickActionId}
          key={quickActionId}
          value={quickActionId}
          dragListener={true}
        >
          <div
            style={{
              background: `var(--color-${deckActions[quickActionId].color}-100)`,
            }}
            className="relative px-4 py-4 text-black rounded-md flex flex-row gap-2 mb-4"
          >
            {deckActions[quickActionId].icon && (
              <img src={deckActions[quickActionId].icon} className="object-contain" width="36px" height="36px" />
            )}
            <div className="grow">{deckActions[quickActionId].label}</div>
            <IconMenu2
              className=""
              style={{ color: "var(--color-stone-400)" }}
              onPointerDown={(e) => controls.start(e)}
            />
          </div>
        </ReorderItem>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Button className="w-full" variant={"ghost"} onClick={() => handleMarkForDeletion(quickActionId)}>
          <IconTrash />
          Mark for deletion
        </Button>
      </PopoverContent>
    </Popover>
  );
}
