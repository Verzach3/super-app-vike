import { AtomStore } from "@/state/Store";
import { PatientTransitionAtom } from "@/state/patient/TransitionAtom";
import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
	AtomStore.set(PatientTransitionAtom, true);
	console.log("Page transition start");
};
