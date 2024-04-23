import "survey-core/defaultV2.min.css";
import type svyCore from "survey-core";
import { useCallback, useEffect, useState } from "react";
import { Container, Title, Text, Center } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import {navigate} from "vike/client/router";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require("survey-core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Survey } = require("survey-react-ui");

function Surveys() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const surveyComplete = useCallback(
    (result: svyCore.Model) => {
      console.log(`Survey results: ${JSON.stringify(result.data, null, 3)}`);
      // submit(result.data, { method: "post" });
      setSurveyCompleted(true);
    },
    [],
  );
  const surveyData = {};
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

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

  const survey = new Model(surveyData);
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
      <Survey model={survey} />
    </div>
  );
}

export default Surveys;
