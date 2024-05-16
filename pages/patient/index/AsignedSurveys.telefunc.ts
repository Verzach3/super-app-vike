import {getXataClient} from "@/db/xata.server";
import { ContextVariableMap } from "hono";
import {getContext} from "telefunc";


async function AsignedSurveysTelefunc() {
  const context = getContext<ContextVariableMap>();
  const xata = getXataClient()
  return await xata.db.asigned_surveys.filter({patient: context.user?.uid}).getAll()
}