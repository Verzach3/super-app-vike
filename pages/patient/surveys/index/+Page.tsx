import {useData} from "vike-react/useData";
import {PatientSurveysData} from "@/pages/patient/surveys/index/+data";
import {Container, SimpleGrid, Title} from "@mantine/core";
import {SurveyCard} from "@/components/patient/surveys/SurveyCard";
import {navigate} from "vike/client/router";
import {Survey} from "@/types/DBTypes";

function PatientSurveys() {
  const loaderData = useData<PatientSurveysData>();

  return (
    <Container mt={"1rem"}>
      <Title
        style={{
          fontFamily: "Inter",
          fontWeight: 800,
          marginBottom: "3rem",
          marginTop: "2rem",
        }}
      >
        Encuestas
      </Title>
      <SimpleGrid cols={1}>
        {loaderData.asignedSurveys?.map((asignedSurvey) => {
          if (!asignedSurvey) return null;
          return (
            <SurveyCard key={asignedSurvey.id} onClick={() => {
              void navigate(`/patient/surveys/${asignedSurvey.survey?.id}`);
            }} survey={asignedSurvey.survey as Survey} answerId={asignedSurvey.answer?.id}/>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}

export default PatientSurveys;
