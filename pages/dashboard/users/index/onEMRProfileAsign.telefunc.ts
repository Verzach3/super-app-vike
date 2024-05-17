import { getXataClient } from "@/db/xata.server";

export async function onEMRProfileAsign(user_id: string, emr_id: string) {
	const xata = getXataClient();
	const res = await xata.db.patient_profiles.update(user_id, {
		emr_id: emr_id,
	});
	console.log(res);
}
