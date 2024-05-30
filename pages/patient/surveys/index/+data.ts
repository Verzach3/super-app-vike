import type { PageContext } from "vike/types";
import { type SurveyAnswersRecord, getXataClient } from "@/db/xata.server";
import type { SelectedPick } from "@xata.io/client";

export type PatientSurveysData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	console.log("data");
	const xata = getXataClient();
	try {
		const patientProfile = await xata.db.patient_profiles
			.filter({ user_id: pageContext.user?.uid })
			.getFirst();
		const asignedSurveys = await xata.db.asigned_surveys
			.filter({ patient: patientProfile?.id })
			.select(["*", "survey.*", "answer.id"])
			.getAll();
		const globalSurveys = await xata.db.surveys
			.filter({ global: true })
			.getAll();
		// check for global surveys answers
		const globalSurveysAnswers: (SelectedPick<
			SurveyAnswersRecord,
			("*" | "survey.*")[]
		> | null)[] = [];
		console.log("asigned", globalSurveys);
		for (const survey of globalSurveys) {
			const answer = await xata.db.survey_answers
				.filter({ survey: survey.id })
				.select(["*", "survey.*"])
				.getFirst();
			globalSurveysAnswers.push(answer);
		}

		console.log("asigned", asignedSurveys);

		return {
			asignedSurveys,
			globalSurveysAnswers,
		};
	} catch (e) {
		console.error("Error fetching surveys", e);
		return {
			error: "No surveys found",
		};
	}
}
