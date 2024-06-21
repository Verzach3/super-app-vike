import { getXataClient } from "@/db/xata.server";

export async function onSurveyUnasign(asignId: string) {
	const xata = getXataClient();
	await xata.db.asigned_surveys.delete(asignId);
}