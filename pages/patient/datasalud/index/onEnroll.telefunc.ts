import { getXataClient } from "@/db/xata.server";
import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";

export async function onEnroll() {
	const client = getXataClient();
	const { webdav, user } = getContext<ContextVariableMap>();

	if (!user) {
    console.log("no user");
		return { error: 401 };
	}

	await webdav.createDirectory(`/${user.uid}`);

	const currentUser = await client.db.patient_profiles
		.filter({ user_id: user.uid })
		.getFirst();

	if (!currentUser) {
    console.log("no user found");
		return { error: 404 };
	}

	await client.db.datasalud.create({ patient_profile: currentUser.id });

	return { status: 201 };
}
