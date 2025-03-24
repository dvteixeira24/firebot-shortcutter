import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { onTriggerPreset } from "./ActionButton.telefunc";
import { PresetAction } from "@/lib/store";

export default function ActionButton(props: {
  presetId: string;
  args?: PresetAction["args"];
  disabled?: boolean;
  label?: string;
  icon?: string | null; // src
  color?: string;
  columnsFactor: number;
}) {
  const { label, icon, disabled, color, columnsFactor, presetId, args } = props;
  const ref = useRef<HTMLButtonElement>(null);

  const { height, width } = useViewportSize();
  const { mutateAsync: triggerPreset } = useMutation({
    mutationFn: onTriggerPreset,
  });

  // const buttonRef = useMergedRef(ref, elementSizeRef);
  useEffect(() => {
    Object.entries({
      "--tw-gradient-from": `var(--color-${color}-300) var(--tw-gradient-from-position)`,
      "--tw-gradient-to": `var(--color-${color}-600) var(--tw-gradient-to-position)`,
      "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`,
    }).forEach(([key, value]) => {
      ref.current?.style.setProperty(key, value);
    });
  }, [color]);

  const fontSizePx = 32 * (width / 768) * (3 / columnsFactor);
  const iconSize = 64 * (width / 768) * (3 / columnsFactor);

  return (
    <Button
      ref={ref}
      disabled={disabled}
      className="p-0 w-full max-w-full h-full overflow-hidden bg-gradient-to-tr from-slate-50 flex flex-col items-center align-middle"
      onClick={() => triggerPreset({ presetId: presetId, args: args })}
    >
      {icon && <img src={icon} className="object-contain" width={label ? iconSize + "px" : "90%"} height={"64px"} />}

      {label && (
        <div
          style={{
            lineHeight: "1",
            textAlign: "center",
            fontSize: fontSizePx,
          }}
          className="self-center w-[90%] text-wrap text-white"
        >
          {label}
        </div>
      )}
    </Button>
  );
}
