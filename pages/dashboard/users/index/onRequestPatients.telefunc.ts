import { getPatients } from "@/libs/emr/fhir/patient";
import { H3Event } from "h3";
import { getContext } from "telefunc";

export async function onRequestPatients() {
  const context = getContext<H3Event>();
  const patients = await getPatients(context.context.cache.data.emr_token);
  return { patients };
}