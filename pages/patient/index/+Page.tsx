import {Card, Center, Container, Group, Image, SimpleGrid, Stack, Text, Title, UnstyledButton,} from "@mantine/core";
import {IconCaretRight} from "@tabler/icons-react";
import {motion} from "framer-motion";
import {FaUserDoctor} from "react-icons/fa6";
import {useEffect, useState} from "react";
import type {Patient} from "fhir/r4";
import {PatientShortcuts} from "@/components/patient/PatientShortcuts";
import {SurveyCard} from "@/components/patient/surveys/SurveyCard";
import { navigate } from "vike/client/router";


function Patient_index() {
  const loaderData = {
    surveys: []
  }
  const [patient, setPatient] = useState<Patient | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  useEffect(() => {
    console.log(loaderData);
    if ("error" in loaderData) {
      console.log(loaderData.error, loaderData.status);
      if (loaderData.error === "Unauthorized") {
        void navigate("/auth");
      }
    }
    if ("patient" in loaderData) {
      setPatient(loaderData?.patient);
    }
    if ("profile" in loaderData) {
      setProfile(loaderData?.profile.data);
    }
  }, []);

  if ("error" in loaderData) {
    return null;
  }

  return (
    <div style={{ paddingBottom: "10rem", height: "100%"}}>
      <Image
        src={"/assets/consultory.avif"}
        style={{ objectFit: "cover", width: "100%", height: "25rem" }}
      />
      {/* Appointment button */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <motion.div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            width: "fit-content",
          }}
          whileHover={{
            scale: 1.03,
          }}
        >
          <Card
            withBorder
            w={"25rem"}
            style={{
              alignSelf: "flex-end",
              top: "-2.5rem",
              marginRight: "2rem",
            }}
          >
            <Center>
              <Group>
                <Title size={"1.2rem"}>
                  ¿Necesitas una cita para diagnostico?
                </Title>
                Necesitas ayuda?
              </Group>
              <IconCaretRight size={"2rem"} />
            </Center>
          </Card>
        </motion.div>
        <Container w={"100%"}>
          <Title ta={"left"} mt={"xss"} style={{ fontFamily: "Inter" }}>
            Hola, {profile?.name}
          </Title>
        </Container>
        <Container w={"100%"}>
          <Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>
            Accesos Directos
          </Text>
        </Container>

        {/* Shortcuts */}
        <Container style={{ width: "100vw", overflowX: "hidden" }} p={0}>
          <PatientShortcuts />
        </Container>

        {/* Encuestas Disponibles */}
        <Container w={"100%"}>
          <Stack>
            <Center>
              <Title
                ta={"center"}
                ff={"Inter"}
                order={3}
                fw={600}
                mt={"4rem"}
                mb={"md"}
              >
                Encuestas Disponibles
              </Title>
            </Center>
            {loaderData.surveys?.length ?? 0 > 0 ? (
              <>
                <SimpleGrid cols={1}>
                  {loaderData.surveys &&
                    loaderData.surveys.map((survey) => {
                      if (!survey.surveys) {
                        return null;
                      }
                      return (
                        <SurveyCard key={survey.surveys.id} onClick={() => {
                          navigate(`/patient/surveys/${survey.surveys?.id}`);
                        }} survey={survey.surveys} answerId={survey.answer_id}/>
                      );
                    })}
                </SimpleGrid>
                <Container fluid>
                  <UnstyledButton onClick={() => navigate("/patient/surveys")}>
                    <Text fw={800} ff={"Inter"}>
                      Ver Mas...
                    </Text>
                  </UnstyledButton>
                </Container>
              </>
            ) : (
              <Container mb={"md"}>
                <Text fw={700} ff={"Inter"} c={"gray"}>
                  No tienes encuestas disponibles.
                </Text>
              </Container>
            )}
          </Stack>
        </Container>

        {/* Recibe Atencion Widget*/}
        <Container>
          <Stack>
            <Center>
              <Title ta={"center"} order={3} fw={600} mt={"4rem"} mb={"md"}>
                Recibe Atencion
              </Title>
            </Center>
            <SimpleGrid cols={2}>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor
                    size={"1.5rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <Title size={"1.2rem"}>
                    ¿Necesitas una cita para diagnostico?
                  </Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor
                    size={"1.5rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <Title size={"1.2rem"}>
                    ¿Necesitas una cita para diagnostico?
                  </Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor
                    size={"1.5rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <Title size={"1.2rem"}>
                    ¿Necesitas una cita para diagnostico?
                  </Title>
                </Center>
              </Card>
              <Card withBorder py={"lg"}>
                <Center>
                  <FaUserDoctor
                    size={"1.5rem"}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <Title size={"1.2rem"}>
                    ¿Necesitas una cita para diagnostico?
                  </Title>
                </Center>
              </Card>
            </SimpleGrid>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

export default Patient_index;
