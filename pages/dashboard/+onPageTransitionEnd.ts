import { AtomStore } from "@/state/Store";
import { TransitionAtom } from "@/state/dashboard/TransitionAtom";
import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
	AtomStore.set(TransitionAtom, false);
	console.log("Page transition end");
};
