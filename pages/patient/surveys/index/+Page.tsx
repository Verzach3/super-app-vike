import { useData } from "vike-react/useData";
import type { PatientSurveysData } from "@/pages/patient/surveys/index/+data";
import { Container, Divider, SimpleGrid, Text, Title } from "@mantine/core";
import { SurveyCard } from "@/components/patient/surveys/SurveyCard";
import { navigate } from "vike/client/router";
import type { Survey } from "@/types/DBTypes";
import { useEffect } from "react";

function PatientSurveys() {
	const loaderData = useData<PatientSurveysData>();

	useEffect(() => {
		console.log(loaderData.globalSurveysAnswers);
	}, [loaderData.globalSurveysAnswers]);

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
			<Text size="xl" ff={"Inter"} fw={600} mt={"xl"}>
				Para todos
			</Text>
			<SimpleGrid cols={1}>
				{loaderData.globalSurveys?.map((asignedSurvey) => {
					if (!asignedSurvey) return null;
					return (
						<SurveyCard
							key={asignedSurvey.id}
							onClick={() => {
								void navigate(`/patient/surveys/${asignedSurvey.id}`);
							}}
							survey={asignedSurvey}
							answerId={
								loaderData.globalSurveysAnswers?.find(
									(answer) => answer?.survey?.id === asignedSurvey.id,
								)?.id
							}
						/>
					);
				})}
			</SimpleGrid>
			<Divider mb={"md"} />
			<Text size="xl" ff={"Inter"} fw={600} mt={"xl"}>
				Para ti
			</Text>
			<Divider mb={"md"} />
			<SimpleGrid cols={1}>
				{loaderData.asignedSurveys?.map((asignedSurvey) => {
					if (!asignedSurvey) return null;
					return (
						<SurveyCard
							key={asignedSurvey.id}
							onClick={() => {
								void navigate(`/patient/surveys/${asignedSurvey.survey?.id}`);
							}}
							survey={asignedSurvey.survey as Survey}
							answerId={asignedSurvey.answer?.id}
						/>
					);
				})}
			</SimpleGrid>
		</Container>
	);
}

export default PatientSurveys;
