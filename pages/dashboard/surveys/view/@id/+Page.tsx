import { useData } from "vike-react/useData";
import type { SurveyData } from "./+data";
import { Button, Container, Select } from "@mantine/core";
import { useState } from "react";
import { onSurveyAsign } from "./SurveyAsign.telefunc";
import { notifications } from "@mantine/notifications";

function SurveyViewPage() {
	const data = useData<SurveyData>();
	const [selectedPatient, setSelectedPatient] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	async function asignSurvey() {
		setLoading(true);
		if (!data.survey) {
			setLoading(false);
			notifications.show({
				title: "Error",
				message: "Survey not found",
				color: "red",
			});
			setLoading(false);
			return;
		}
		await onSurveyAsign(data.survey.id, selectedPatient);
		notifications.show({
			title: "Success",
			message: "Survey assigned",
			color: "green",
		});
		setLoading(false);
	}

	return (
		<Container>
			<h1>SurveyViewPage</h1>
			<Select
				data={data.patients.map((patient) => {
					return { label: patient.name, value: patient.id };
				})}
				value={selectedPatient}
				onChange={(v) => setSelectedPatient(v ?? "")}
			/>
			<Button loading={loading} onClick={asignSurvey}>
				Asignar
			</Button>
		</Container>
	);
}

export default SurveyViewPage;
