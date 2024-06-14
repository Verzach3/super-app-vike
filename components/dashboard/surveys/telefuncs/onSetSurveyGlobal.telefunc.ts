import { getXataClient } from "@/db/xata.server";

export async function onSetSurveyGlobal(id: string, global: boolean) {
	const xata = getXataClient();
	return await xata.db.surveys.update(id, { global: global });
}
