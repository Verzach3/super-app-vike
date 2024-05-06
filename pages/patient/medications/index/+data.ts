import { getXataClient } from "@/db/xata.server";
import { getPatientMedication } from "@/libs/emr/fhir/medicationRequest";
import { PageContext } from "vike/types";

export type PatientMedicationType = Awaited<ReturnType<typeof getPatientMedication>>

export async function data(pageContex: PageContext) {
  const xata = getXataClient();
  if (!pageContex.user) {
    return null;
  }
  const patientProfile = await xata.db.patient_profiles.filter({ user_id: pageContex.user.uid }).getFirst();
  console.log(patientProfile);
  
  if (!patientProfile?.emr_id) {
    return null;
  }
  return await getPatientMedication(pageContex.cache.data.emr_token, patientProfile?.emr_id)
}