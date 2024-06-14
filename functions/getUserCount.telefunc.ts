import { getXataClient } from "@/db/xata.server";

export async function getUserCount() {
	const client = getXataClient();
	return (
		await client.db.patient_profiles.aggregate({
			totalCount: {
				count: "*",
			},
		})
	).aggs.totalCount;
}
