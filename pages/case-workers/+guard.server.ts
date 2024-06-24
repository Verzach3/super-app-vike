import { redirect, render } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { checkForRole } from "./guard.telefunc";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
	if (!pageContext.user) {
		throw redirect("/login", 302);
	}

	if (await checkForRole(pageContext.user.uid, "case-worker")) {
		return;
	}

	throw redirect("/patient", 302);
	// if (!await xata.db.patient_profiles.read(pageContext.user.uid)) {
	//   redirect("/patient/finishProfile", 302);
	// }
};

export { guard };
