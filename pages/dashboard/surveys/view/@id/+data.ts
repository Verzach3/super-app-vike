import { getXataClient } from "@/db/xata.server";
import { PageContext } from "vike/types";

export type SurveyData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const xata = getXataClient();
  const survey = await xata.db.surveys.read(pageContext.routeParams?.id ?? "");
  const patients = await xata.db.patient_profiles.getPaginated({
    pagination: {
      size: 10,
    }
  })
  return {survey, patients: patients.records};
}