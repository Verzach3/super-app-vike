import { getXataClient } from "@/db/xata.server";

async function checkForRole(uid: string, role: string): Promise<boolean> {
	const xata = getXataClient();
	const asignedRole = await xata.db.asigned_roles
		.filter({
			user_uid: uid,
			"asigned_role.type": role,
		})
		.getFirst();

	return !!asignedRole;
}

export { checkForRole };
