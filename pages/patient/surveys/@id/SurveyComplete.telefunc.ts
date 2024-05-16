import { getXataClient } from "@/db/xata.server";
import { Survey } from "@/types/DBTypes";
import { ContextVariableMap } from "hono";
import { getContext } from "telefunc";

type OnSurveyCompleteArgs = {
  survey: Survey;
  response: object;
}

export async function onSurveyComplete({ survey, response }: OnSurveyCompleteArgs) {
  const context = getContext<ContextVariableMap>()
  const xata = getXataClient()
  const profile = await xata.db.patient_profiles.filter({ user_id: context.user?.uid }).select(["id"]).getFirst()
  if (!profile) {
    return { error: "Profile not found" }
  }
  const res = await xata.db.survey_answers.create({
    survey: survey.id,
    respondent: profile.id,
    answer: response,
  })
  const asignedSurvey = await xata.db.asigned_surveys.select(["id"]).filter({ survey: survey.id, patient: profile.id }).getFirst()
  if (!asignedSurvey) {
    return { error: "Survey not found" }
  }
  await xata.db.asigned_surveys.updateOrThrow({
    id: asignedSurvey.id,
    answer: res.id,
  })
}