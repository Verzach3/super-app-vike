import { useData } from "vike-react/useData";
import { RegistedUsers } from "./+data";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Drawer,
  Group,
  TextInput,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Center,
  Loader,
  Table,
} from "@mantine/core";
import { IconArrowRight, IconSearch, IconUser } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { Bundle, Patient } from "fhir/r4";
import { onRequestPatients } from "./onRequestPatients.telefunc";
import { onEMRProfileAsign } from "./onEMRProfileAsign.telefunc";
import { notifications } from "@mantine/notifications";
import { PatientProfilesRecord } from "@/db/xata.server";
import { SelectedPick } from "@xata.io/client";
import UsersSearch from "@/components/dashboard/patients/UsersSearch";

function Page() {
  const data = useData<RegistedUsers>();
  const [selectedPatient, setSelectedPatient] = useState<
    (typeof data)["patients"]["records"][number] | undefined
  >();
  const [drawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [asignEMRIdOpen, { open: openAsignEMRId, close: closeAsignEMRId }] =
    useDisclosure(false);
  const [asignLoading, setAsignLoading] = useState(false);
  const [patients, setPatients] = useState<Bundle<Patient> | undefined>();

  async function getPatients() {
    setAsignLoading(true);
    const patients = await onRequestPatients();
    if (!patients.patients) return;
    setPatients(patients.patients);
    setAsignLoading(false);
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <>
      {PatientDrawer(drawerOpen, closeDrawer, selectedPatient, openAsignEMRId)}
      {ProfileAsignDrawe(
        asignEMRIdOpen,
        closeAsignEMRId,
        selectedPatient,
        asignLoading,
        patients
      )}
      <Container mt={"2rem"}>
        <Title mb={"md"} ff={"Inter"}>
          Usuarios
        </Title>
        <Group grow mb={"md"}>
          <UsersSearch />
        </Group>
        <Group mb={"md"} grow>
          <TextInput placeholder="Buscar"/>
          <Group justify="right">
            <Button>Buscar</Button>
          </Group>
        </Group>

        <Table withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Apellido</Table.Th>
              <Table.Th>Telefono</Table.Th>
              <Table.Th>Perfil EMR</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.patients.records.map((patient) => {
              return (
                <Table.Tr key={patient.id}>
                  <Table.Td>{patient.name}</Table.Td>
                  <Table.Td>{patient.lastname}</Table.Td>
                  <Table.Td>{patient.phone}</Table.Td>
                  <Table.Td>{patient.emr_id}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() => {
                        setSelectedPatient(patient);
                        openDrawer();
                      }}
                    >
                      <IconArrowRight />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Container>
    </>
  );
}

export default Page;

function ProfileAsignDrawe(
  asignEMRIdOpen: boolean,
  closeAsignEMRId: () => void,
  selectedPatient:
    | Readonly<SelectedPick<PatientProfilesRecord, ["*"]>>
    | undefined,
  asignLoading: boolean,
  patients: Bundle<Patient> | undefined
) {
  return (
    <Drawer
      opened={asignEMRIdOpen}
      onClose={closeAsignEMRId}
      position="right"
      withCloseButton={false}
    >
      <Title mb={"md"}>Asignar Perfil EMR</Title>
      <Stack>
        <Group>
          <TextInput
            placeholder="Nombre"
            value={selectedPatient?.name}
            w={"100%"}
            rightSection={<IconSearch />}
          />
        </Group>
        {asignLoading ? (
          <Center>
            <Loader type="dots" />
          </Center>
        ) : (
          patients?.entry?.map((patient) => {
            return (
              <Card
                withBorder
                key={patient.resource?.id}
                onClick={async () => {
                  closeAsignEMRId();
                  if (!selectedPatient) {
                    notifications.show({
                      title: "Error",
                      message: "No se ha seleccionado un paciente",
                      color: "red",
                    });
                    return;
                  }
                  if (!patient.resource?.id) {
                    notifications.show({
                      title: "Error",
                      message: "No se ha seleccionado un perfil EMR",
                      color: "red",
                    });
                    return;
                  }
                  await onEMRProfileAsign(
                    selectedPatient.id,
                    patient.resource.id
                  );
                  notifications.show({
                    title: "Perfil EMR Asignado",
                    message: "El perfil EMR ha sido asignado correctamente",
                    color: "green",
                  });
                }}
              >
                <Group>
                  <ThemeIcon radius={"lg"} size={"lg"} bg={"gray"}>
                    <IconUser />
                  </ThemeIcon>
                  <Text fw={600}>
                    {patient.resource?.name?.[0]?.given?.[0]}{" "}
                    {patient.resource?.name?.[0]?.family?.[0]}
                  </Text>
                </Group>
              </Card>
            );
          })
        )}
      </Stack>
    </Drawer>
  );
}

function PatientDrawer(
  drawerOpen: boolean,
  closeDrawer: () => void,
  selectedPatient:
    | Readonly<SelectedPick<PatientProfilesRecord, ["*"]>>
    | undefined,
  openAsignEMRId: () => void
) {
  return (
    <Drawer
      opened={drawerOpen}
      onClose={closeDrawer}
      position="right"
      withCloseButton={false}
    >
      <Title mb={"md"}>Paciente</Title>
      <Stack>
        <TextInput
          placeholder="Nombre"
          label="Nombre"
          defaultValue={selectedPatient?.name}
        />
        <TextInput
          placeholder="Segundo Nombre"
          label="Segundo Nombre"
          defaultValue={selectedPatient?.second_name ?? ""}
        />
        <TextInput
          placeholder="Apellido"
          label="Apellido"
          defaultValue={selectedPatient?.lastname}
        />
        <TextInput
          placeholder="Segundo Apellido"
          label="Segundo Apellido"
          defaultValue={selectedPatient?.second_lastname ?? ""}
        />
        <Select
          placeholder="Genero"
          data={["M", "F"]}
          label="Genero"
          defaultValue={selectedPatient?.gender}
        />
        <TextInput
          placeholder="Phone"
          label="Telefono"
          defaultValue={selectedPatient?.phone}
        />
        <DateInput
          placeholder="Fecha de Nacimiento"
          label="Fecha de Nacimiento"
          defaultValue={selectedPatient?.birth_date ?? new Date()}
        />
        <TextInput
          placeholder="Perfil EMR"
          disabled
          label="Perfil EMR"
          defaultValue={selectedPatient?.emr_id ?? ""}
        />
        <Button color="gray" onClick={openAsignEMRId}>
          Asignar Perfil EMR
        </Button>
        <Button>Guardar</Button>
      </Stack>
    </Drawer>
  );
}
