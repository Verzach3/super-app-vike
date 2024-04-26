export type PatientProfile = {
  id: string;
  emr_id: string;
  user_id: string;
  name: string;
  second_name: string;
  lastname: string;
  birth_date: Date;
  gender: string;
  phone: string;
  second_lastname: string;
};

export type SurveyAnswer = {
  id: string;
  survey: Survey;
  respondent: PatientProfile;
  answer: JSON;
};

export type Survey = {
  id: string;
  name: string;
  json: JSON;
  description: string;
};

export type AssignedSurvey = {
  id: string;
  survey: Survey;
  patient: PatientProfile;
  answer: SurveyAnswer;
};