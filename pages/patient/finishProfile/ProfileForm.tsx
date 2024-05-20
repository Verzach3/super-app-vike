import {
	Button,
	Center,
	Image,
	Select,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
	onCompleteProfile,
	type ProfileValidatorType,
} from "@/pages/patient/finishProfile/ProfileForm.telefunc";
import { notifications } from "@mantine/notifications";
import { navigate } from "vike/client/router";

function ProfileForm() {
	const [loading, setLoading] = useState(false);
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			second_name: "",
			lastname: "",
			second_lastname: "",
			birth_date: new Date(),
			gender: "M",
			phone: "",
		},

		validate: {
			name: (value) => (value.length > 2 ? null : "Nombre invalido"),
			lastname: (value) => (value.length > 2 ? null : "Apellido invalido"),
			gender: (value) =>
				value === "M" || value === "F" ? null : "Opcion invalida",
		},
	});

	async function completeProfile(profile: ProfileValidatorType) {
		setLoading(true);
		const res = await onCompleteProfile(profile);
		if (res.status === "ok") {
			console.log("Profile completed", profile);
			await navigate("/patient");
		}
		if (res.error) {
			console.error("Error completing profile", res.error);
			notifications.show({
				title: "Error",
				message: res.error,
				color: "red",
			});
		}
		setLoading(false);
	}

	return (
		<Stack>
			<Center>
				<Image src={"/assets/wellfit-bottom-text.svg"} h={230} w={"auto"} />
			</Center>
			<form
				onSubmit={form.onSubmit((values) =>
					completeProfile(values as ProfileValidatorType),
				)}
			>
				<Title ta={"center"}>Terminemos tu perfil</Title>
				<Text ta={"center"} fw={600} c={"gray"}>
					Para poder brindarte un mejor servicio, necesitamos conocer mas de ti.
				</Text>
				<TextInput
					label={"Nombre"}
					required
					mt={"2rem"}
					{...form.getInputProps("name")}
				/>
				<TextInput
					label={"Segundo Nombre (Opcional)"}
					{...form.getInputProps("second_name")}
				/>
				<TextInput
					label={"Apellido"}
					required
					{...form.getInputProps("lastname")}
				/>
				<TextInput
					label={"Segundo Apellido (Opcional)"}
					{...form.getInputProps("second_lastname")}
				/>
				<DateInput
					label={"Fecha de nacimiento"}
					required
					{...form.getInputProps("birth_date")}
				/>
				<Select
					label={"Genero asignado al nacer"}
					data={[
						{ label: "Masculino", value: "M" },
						{ label: "Femenino", value: "F" },
					]}
					required
					{...form.getInputProps("gender")}
				/>
				<TextInput
					label={"Numero de telefono"}
					{...form.getInputProps("phone")}
				/>
				<Button mt={"2rem"} type={"submit"} w={"100%"} loading={loading}>
					Continuar
				</Button>
			</form>
		</Stack>
	);
}

export default ProfileForm;
