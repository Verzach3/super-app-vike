import { Group, SegmentedControl, Select, Stack } from "@mantine/core";
import { useState } from "react";
import { match } from "ts-pattern";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Tab = "registered" | "emr" | "full_profile";

function UsersSearch() {
	const [activeTab, setActiveTab] = useState<Tab>("full_profile");
	const [animationParent] = useAutoAnimate();
	return (
		<Group w={"50%"}>
			<Stack ref={animationParent}>
				<Select
					value={activeTab}
					onChange={(e) => setActiveTab((e ?? "full_profile") as Tab)}
					label="Tipo de usuario"
					placeholder="Pick value"
					data={[
						{ label: "Registrado", value: "registered" },
						{ label: "EMR", value: "emr" },
						{ label: "Perfil Completo", value: "full_profile" },
					]}
					defaultValue="full_profile"
					allowDeselect={false}
				/>
				{match(activeTab)
					.with("full_profile", () => <FullProfileFilters />)
					.with("registered", () => <RegisteredFilters />)
					.with("emr", () => <EmrFilters />)
					.exhaustive()}
			</Stack>
		</Group>
	);
}

function FullProfileFilters() {
	return (
		<SegmentedControl
			radius={"md"}
			data={[
				"Primer Nombre",
				"Apellido",
				"Fecha de Nacimiento",
				"Cedula",
				"Email",
			]}
		/>
	);
}

function RegisteredFilters() {
	return <SegmentedControl radius={"md"} data={["Email"]} />;
}

function EmrFilters() {
	return (
		<SegmentedControl
			radius={"md"}
			data={["Primer Nombre", "Apellido", "Fecha de Nacimiento", "Cedula"]}
		/>
	);
}

export default UsersSearch;
