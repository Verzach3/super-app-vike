import {getXataClient} from "@/db/xata.server";
import {getAuth} from "firebase-admin/auth";

export async function onUserCheck(userId: string) {
  const xata = getXataClient();
  const profile = await xata.db.patient_profiles.read(userId);
  if (!profile) {
    console.log("No profile found for user", userId);
    return false;
  }

  return true;
}