import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  console.log("Page transition end");
  document.querySelector("main")?.style.removeProperty("filter");
};
