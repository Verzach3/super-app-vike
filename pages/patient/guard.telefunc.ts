import { getXataClient } from "@/db/xata.server";

export async function onUserCheck(userId: string) {
	const xata = getXataClient();
	const profile = await xata.db.patient_profiles
		.filter({ user_id: userId })
		.getFirst();
	if (!profile) {
		console.log("No profile found for user", userId);
		return false;
	}

	return true;
}
