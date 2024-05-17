import { getXataClient } from "@/db/xata.server";

export async function onCreateSurvey(name: string, description: string) {
	const xata = getXataClient();
	return await xata.db.surveys.create({
		name,
		description,
		json: {},
	});
}
