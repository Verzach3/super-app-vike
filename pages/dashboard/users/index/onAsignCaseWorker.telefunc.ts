import { getXataClient } from "@/db/xata.server";

export async function onAsignCaseWorker(userId: string, caseWorkerId: string) {
	const xata = getXataClient();

	try {
		await xata.db.case_workers.createOrUpdate({
			patient: userId,
			worker: caseWorkerId,
		});
	} catch (e) {
		console.log("Error asigning case worker", e);
		return { error: "Error asigning case worker" };
	}
}
