import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";
import { FileStat } from "webdav";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(context: PageContext) {
	const { webdav } = context;
	const { db } = getXataClient();
	if (!context.user) {
		console.log("no user");
		return { error: 401 };
	}
	const user = await db.patient_profiles
		.filter({ user_id: context.user.uid })
		.getFirst();
	if (!user) {
		console.log("no user found");
		return { error: 404 };
	}
	const isInDatasalud = await db.datasalud
		.filter({ patient_profile: { id: user.id } })
		.getFirst();
	if (!isInDatasalud) {
		console.log("user not in datasalud");
		return { error: 404 };
	}

	const files = <FileStat[]> await webdav.getDirectoryContents(`/${context.user.uid}`);
	console.log(files);
	return { status: 200, data: user, files };
}
