import { AtomStore } from "@/state/Store";
import { PatientTransitionAtom } from "@/state/patient/TransitionAtom";
import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
	AtomStore.set(PatientTransitionAtom, false);
	console.log("Page transition end");
};
