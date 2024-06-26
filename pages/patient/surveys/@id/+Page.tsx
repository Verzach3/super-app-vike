import "survey-core/defaultV2.min.css";
import type svyCore from "survey-core";
import { useCallback, useEffect, useState } from "react";
import { Container, Title, Text, Center } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { navigate } from "vike/client/router";
import { useData } from "vike-react/useData";
import type { SurveyData } from "@/pages/patient/surveys/@id/+data";
import { onSurveyComplete } from "./SurveyComplete.telefunc";
import type { Survey } from "@/types/DBTypes";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require("survey-core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Survey: SurveyUI } = require("survey-react-ui");

function Surveys() {
	const [surveyCompleted, setSurveyCompleted] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const surveyData = useData<SurveyData>();
	const surveyComplete = useCallback((result: svyCore.Model) => {
		console.log(`Survey results: ${JSON.stringify(result.data, null, 3)}`);
		onSurveyComplete({ survey: surveyData as Survey, response: result.data });
		setSurveyCompleted(true);
	}, [surveyData]);
	const interval = useInterval(() => {
		if (seconds < 5) {
			setSeconds((s) => s + 1);
		}
	}, 1000);

	useEffect(() => {
		if (seconds >= 5) {
			void navigate("/patient/surveys");
		}
	}, [seconds]);

	useEffect(() => {
		if (surveyCompleted) {
			interval.start();
		}
		return interval.stop;
	}, [interval, surveyCompleted]);

	const survey = new Model(surveyData?.json);
	survey.onComplete.add(surveyComplete);
	if (surveyCompleted) {
		return (
			<Container
				fluid
				h={"100%"}
				style={{
					flex: 1,
				}}
			>
				<Center h={"100%"}>
					<Container mt={"xl"}>
						<Title ff={"Inter"} ta={"center"}>
							Encuesta Completada
						</Title>
						<Text ff={"Inter"} ta={"center"} size={"md"}>
							Gracias por completar la encuesta
						</Text>
						<Text ff={"Inter"} ta={"center"}>
							Te vamos a redirigir a Encuestas en {5 - seconds} segundos
						</Text>
					</Container>
				</Center>
			</Container>
		);
	}

	return (
		<div style={{ height: "100%" }}>
			<SurveyUI model={survey} />
		</div>
	);
}

export default Surveys;
