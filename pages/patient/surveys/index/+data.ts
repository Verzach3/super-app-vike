import type { PageContext } from "vike/types";
import { getXataClient } from "@/db/xata.server";

export type PatientSurveysData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	try {
		const patientProfile = await xata.db.patient_profiles
			.filter({ user_id: pageContext.user?.uid })
			.getFirst();
		const asignedSurveys = await xata.db.asigned_surveys
			.filter({ patient: patientProfile!.id })
			.select(["*", "survey.*", "answer.id"])
			.getAll();

		return {
			asignedSurveys,
		};
	} catch {
		return {
			error: "No surveys found",
		};
	}
}
