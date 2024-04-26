import {getXataClient} from "@/db/xata.server";
import {getContext} from "telefunc";
import {H3Event} from "h3";


async function AsignedSurveysTelefunc() {
  const context = getContext<H3Event>();
  const xata = getXataClient()
  return await xata.db.asigned_surveys.filter({patient: context.context.user?.uid}).getAll()
}