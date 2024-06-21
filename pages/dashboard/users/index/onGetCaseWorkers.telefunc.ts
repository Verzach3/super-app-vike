import { getXataClient } from "@/db/xata.server";

export async function onGetCaseWorkers() {
	const xata = getXataClient();
	const users = await xata.db.patient_profiles.getAll();
	const roles = await xata.db.asigned_roles
		.select(["*", "asigned_role.*"])
		.getAll();

	const caseWorkers = roles
		.filter(
			(role) => role.asigned_role && role.asigned_role.type === "case-worker",
		)
		.map((role) => {
			return users.find((user) => user.user_id === role.user_uid);
		});
	return caseWorkers;
}
