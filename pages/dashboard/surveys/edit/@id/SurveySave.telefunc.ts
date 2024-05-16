import { getXataClient } from "@/db/xata.server";

export async function onSaveSurvey(data: object, id: string) {
  const xata = getXataClient();
  try {
    const res = await xata.db.surveys.update(id, { json: data });
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}