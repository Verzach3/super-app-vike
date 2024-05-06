import { getXataClient } from "@/db/xata.server";
import { getPatients } from "@/libs/emr/fhir/patient";
import { getAuth } from "firebase-admin/auth";
import { PageContext } from "vike/types";
export type RegistedUsers = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const xata = getXataClient()
  const patients = await xata.db.patient_profiles.getPaginated({
    pagination: {
      size: 10,
    }
  })
  return { patients: patients };
}