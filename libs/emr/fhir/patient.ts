import axios from "axios";
import type { Bundle, Patient } from "fhir/r4";

const patientURL = `${process.env.EMR_URL}/apis/default/fhir/Patient`;

export async function getPatients(
	auth: string,
): Promise<Bundle<Patient> | null> {
	try {
		const response = await axios.get(patientURL, {
			headers: {
				Authorization: `Bearer ${auth}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
