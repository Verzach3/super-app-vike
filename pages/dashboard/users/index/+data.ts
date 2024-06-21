import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";
export type RegistedUsers = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	const patients = await xata.db.patient_profiles.getPaginated({
		pagination: {
			size: 10,
		},
	});
	const caseWorkers = await xata.db.case_workers.select(["patient.*", "worker.*"]).getPaginated({
		pagination: {
			size: 10,
		},
	});
	return { patients: patients, caseWorkers };
}
