import { getPatients } from "@/libs/emr/fhir/patient";
import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";

export async function onRequestPatients() {
	const context = getContext<ContextVariableMap>();
	const patients = await getPatients(context.cache.data.emr_token);
	return { patients };
}
