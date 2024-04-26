import { getXataClient } from "@/db/xata.server";

export async function onSurveyAsign(surveyId: string, patientId: string) {
  const xata = getXataClient();
  await xata.db.asigned_surveys.createOrReplace({
    patient: patientId,
    survey: surveyId
  })
}
