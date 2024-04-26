import { getXataClient } from "@/db/xata.server"

export type SurveysPageData = Awaited<ReturnType<typeof data>>;

export async function data() {
  const xata = getXataClient();
  const surveys = await xata.db.surveys.getPaginated({
    pagination: {
      size: 9
    }
  })

  const surveyAnswers: { [index: string ]: number} = {};
  const surveyAsignees: { [index: string ]: number} = {};
  for (const survey of surveys.records) {
    const res = await xata.db.survey_answers.filter({ survey: survey.id }).summarize({
      summaries: {
        responses: { count: "*" }
      }
    })
    surveyAnswers[survey.id] = res.summaries[0].responses
    const surveyAsignee = await xata.db.asigned_surveys.filter({ survey: survey.id }).summarize({
      summaries: {
        asignees: { count: "*" }
      }
    })
    surveyAsignees[survey.id] = surveyAsignee.summaries[0].asignees
  }

  console.log(JSON.stringify(surveyAnswers, null, 2))
  console.log(JSON.stringify(surveyAsignees, null, 2))


  return { surveys: surveys.records, surveyAnswers, surveyAsignees }

}