import { AtomStore } from "@/state/Store";
import { TransitionAtom } from "@/state/dashboard/TransitionAtom";
import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  AtomStore.set(TransitionAtom, true);
  console.log("Page transition start");
};
