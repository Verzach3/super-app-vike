import { AtomStore } from "@/state/Store";
import { DashboardTransitionAtom } from "@/state/dashboard/TransitionAtom";
import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
	AtomStore.set(DashboardTransitionAtom, false);
	console.log("Page transition end");
};
