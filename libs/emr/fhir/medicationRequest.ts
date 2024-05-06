import axios from "axios";
import type { Bundle, MedicationRequest, Patient } from "fhir/r4";

const patientURL = `${process.env.EMR_URL}/apis/default/fhir/MedicationRequest`;

export async function getPatientMedication(auth: string, id: string): Promise<Bundle<MedicationRequest> | null> {
  try {
    const response = await axios.get(patientURL, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        patient: id
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}