import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  console.log("Page transition start");
  document.querySelector("main")?.style.setProperty("filter", "blur(24px)");
};
