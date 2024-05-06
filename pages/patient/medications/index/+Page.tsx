import { useData } from "vike-react/useData";
import { PatientMedicationType } from "./+data";
import { Card, Container, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { useEffect } from "react";
import { IconMedicineSyrup } from "@tabler/icons-react";

function PatientMedication() {
  const data = useData<PatientMedicationType>()
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <Container mt={"2rem"}>
      <Title mb={"2rem"}>
        Medicamentos
      </Title>
      <Stack>
        {data?.entry?.filter((item) => item.resource?.intent === "order").map((medicationRequest) => (
          <Card key={medicationRequest.resource?.id} withBorder>
            <Group>
              <ThemeIcon variant="white">
                <IconMedicineSyrup />
              </ThemeIcon>
              <Text>
                {medicationRequest.resource?.medicationCodeableConcept?.coding?.[0]?.display}
              </Text>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default PatientMedication;