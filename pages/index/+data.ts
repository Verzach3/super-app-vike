import { getXataClient } from "@/db/xata.server";
import { select } from "survey-creator-core";
import type { PageContext } from "vike/types";

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	const uid = pageContext.user?.uid;
	const asignedRole = await xata.db.asigned_roles
	.select(["asigned_role.*"])
	.filter({
		user_uid: uid,
	})
		.getFirst();

	if (!asignedRole) {
		return "/patient";
	}

	if (asignedRole.asigned_role?.type === "case-worker") {
		return "/case-workers";
	}

	if (asignedRole.asigned_role?.type === "admin") {
		return "/dashboard";
	}

	return "/login";
}
