import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";

export type SurveyData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	const survey = await xata.db.surveys.read(pageContext.routeParams?.id ?? "");

	if (!survey) {
		return { survey: null, patients: [], surveyAsignees: [] };
	}

	const surveyAsignees = await xata.db.asigned_surveys
		.select(["patient.*"])
		.filter({ "survey.id": survey.id })
		.getPaginated({
			pagination: {
				size: 10,
			},
		});
	const patients = await xata.db.patient_profiles.getPaginated({
		pagination: {
			size: 10,
		},
	});
	return {
		survey,
		patients: patients.records,
		surveyAsignees: surveyAsignees.records,
	};
}
