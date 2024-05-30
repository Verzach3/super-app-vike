import { getXataClient } from "@/db/xata.server";

export async function onSetSurveyGlobal(id: string) {
	const xata = getXataClient();
	return await xata.db.surveys.update(id, { global: true });
}
