import { AtomStore } from "@/state/Store";
import { DashboardTransitionAtom } from "@/state/dashboard/TransitionAtom";
import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
	AtomStore.set(DashboardTransitionAtom, true);
	console.log("Page transition start");
};
