import {
	Affix,
	Button,
	Group,
	JsonInput,
	Modal,
	TextInput,
	rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { onCreateSurvey } from "./telefuncs/CreateSurveyModal.telefunc";
import { useState } from "react";
import { navigate } from "vike/client/router";

export function CreateSurveyModal(props: {
	opened: boolean;
	onClose: () => void;
}) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	async function createSurvey() {
		props.onClose();
		const id = notifications.show({
			loading: true,
			title: "Creando Encuesta",
			message: "Estamos creando la encuesta, por favor espera...",
			autoClose: false,
			withCloseButton: false,
		});
		const survey = await onCreateSurvey(name, description);
		notifications.update({
			id,
			loading: false,
			color: "teal",
			icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
			title: "Encuesta Creada",
			message: "La encuesta ha sido creada exitosamente.",
			autoClose: true,
			withCloseButton: true,
		});
		await navigate(`/dashboard/surveys/edit/${survey.id}`); //
	}

	return (
		<Modal
			pb={"xl"}
			size={"xl"}
			opened={props.opened}
			onClose={props.onClose}
			title={"Crear una Encuesta"}
			styles={{
				title: {
					fontFamily: "Inter",
					fontWeight: 600,
				},
			}}
		>
			<TextInput
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				label={"Nombre de la Encuesta"}
				placeholder={"Encuesta de satisfaccion"}
				required
			/>
			<TextInput
				value={description}
				onChange={(e) => setDescription(e.currentTarget.value)}
				label={"Descripcion de la Encuesta"}
				placeholder={"Una descripcion"}
				mt={"sm"}
			/>
			<Group grow justify="end">
				<Button mt="2rem" onClick={createSurvey}>
					Crear Encuesta
				</Button>
			</Group>
		</Modal>
	);
}
