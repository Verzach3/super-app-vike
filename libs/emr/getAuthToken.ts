import axios from "axios"

const options = {
  method: 'POST',
  url: `${process.env.EMR_URL}/oauth2/default/token`,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'password',
    client_id: `${process.env.EMR_CLIENT_ID}`,
    scope: 'openid api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/transaction.read user/transaction.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Coverage.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/AllergyIntolerance.read patient/CareTeam.read patient/Condition.read patient/Coverage.read patient/Encounter.read patient/Immunization.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read',
    user_role: 'users',
    username: `${process.env.EMR_USER}`,
    password: `${process.env.EMR_PASSWORD}`
  }
};

export async function getAuthToken() {
  try {
    const response = await axios.request(options)
    return <string> response.data.access_token ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}