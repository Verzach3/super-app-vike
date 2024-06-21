import { useData } from "vike-react/useData";
import type { SurveyData } from "./+data";
import {
	ActionIcon,
	Button,
	Card,
	Center,
	Container,
	Group,
	Select,
	Table,
	Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { onSurveyAsign } from "./SurveyAsign.telefunc";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { reload } from "vike/client/router";
import { IconX } from "@tabler/icons-react";
import { CircleX } from "lucide-react";
import { onSurveyUnasign } from "./SurveyUnasign.telefunc";

function SurveyViewPage() {
	const data = useData<SurveyData>();
	const [selectedPatient, setSelectedPatient] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	async function asignSurvey() {
		if (selectedPatient === "") {
			notifications.show({
				title: "Error",
				message: "Selecciona por favor un paciente",
				color: "red",
			});
			return;
		}
		setLoading(true);
		if (!data.survey) {
			setLoading(false);
			notifications.show({
				title: "Error",
				message: "No se encontro la encuesta",
				color: "red",
			});
			setLoading(false);
			reload();
			return;
		}
		await onSurveyAsign(data.survey.id, selectedPatient);
		notifications.show({
			title: "Success",
			message: "Survey assigned",
			color: "green",
		});
		setLoading(false);
		reload()
	}

	return (
		<Container>
			<Title my={"lg"}>{data.survey?.name}</Title>
			<Group grow>
				<Group grow>
					<Select
						w={"85%"}
						data={data.patients.map((patient) => {
							return { label: patient.name, value: patient.id };
						})}
						value={selectedPatient}
						onChange={(v) => setSelectedPatient(v ?? "")}
					/>
				</Group>
				<Group justify="end">
					<Button ml={"lg"} loading={loading} onClick={asignSurvey}>
						Asignar
					</Button>
				</Group>
			</Group>
			<Title order={4} mt={"xl"} mb={"md"}>
				Pacientes asignados a este survey:{" "}
			</Title>
			<Card withBorder>
				<Table.ScrollContainer minWidth={"90dvh"}>
					<Table>
						<Table.Thead>
							<Table.Th>Nombre del Paciente</Table.Th>
							<Table.Th>Fecha de Asignación</Table.Th>
							<Table.Th>Acciones</Table.Th>
						</Table.Thead>
						<Table.Tbody>
							{data.surveyAsignees.map((surveyAsign) => {
								if (!surveyAsign.patient) {
									return null;
								}
								return (
									<Table.Tr key={surveyAsign.id}>
										<Table.Td>{surveyAsign.patient.name}</Table.Td>
										<Table.Td>
											{dayjs(surveyAsign.xata.createdAt).format("DD/MM/YYYY")}
										</Table.Td>
										<Table.Td>
											<Center>
												<ActionIcon
													variant="transparent"
													onClick={async () => {
														setLoading(true);
														try {
															await onSurveyUnasign(surveyAsign.id);
														} catch {}
														notifications.show({
															title: "Success",
															message: "Survey asignado eliminado",
															color: "green",
														});
														setLoading(false);
														reload();
													}}
												>
													<CircleX />
												</ActionIcon>
											</Center>
										</Table.Td>
									</Table.Tr>
								);
							})}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
		</Container>
	);
}

export default SurveyViewPage;
