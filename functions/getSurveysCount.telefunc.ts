import { getXataClient } from "@/db/xata.server";

export async function getSurveysCount() {
	const client = getXataClient();
	return (
		await client.db.surveys.aggregate({
			totalCount: {
				count: "*",
			},
		})
	).aggs.totalCount;
}
