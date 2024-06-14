import { Group, SegmentedControl, Select, Stack } from "@mantine/core";
import { useState } from "react";
import { match } from "ts-pattern";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Tab = "registered" | "emr" | "full_profile" | "datasalud";

interface UsersSearchProps {
	onSelect: React.Dispatch<
		React.SetStateAction<"datasalud" | "registered" | "emr" | "full_profile">
	>;
	onFilter: React.Dispatch<
		React.SetStateAction<
			"all" | "registered" | "emr" | "full_profile" | "datasalud"
		>
	>;
}

function UsersSearch({ onSelect, onFilter }: UsersSearchProps) {
	const [activeTab, setActiveTab] = useState<Tab>("full_profile");
	const [animationParent] = useAutoAnimate();
	return (
		<Group w={"50%"}>
			<Stack ref={animationParent}>
				<Select
					value={activeTab}
					onChange={(e) => {
						setActiveTab((e ?? "full_profile") as Tab);
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						onSelect((e as any) ?? "full_profile");
					}}
					label="Tipo de usuario"
					placeholder="Pick value"
					data={[
						{ label: "Registrado", value: "registered" },
						{ label: "EMR", value: "emr" },
						{ label: "Perfil Completo", value: "full_profile" },
						{ label: "Datasalud", value: "datasalud" },
					]}
					defaultValue="full_profile"
					allowDeselect={false}
				/>
				<SegmentedControl
					onChange={(e) => {
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						onFilter((e as any) ?? "all");
					}}
					data={match(activeTab)
						.with("full_profile", () => [
							"Primer Nombre",
							"Apellido",
							"Fecha de Nacimiento",
							"Cedula",
						])
						.with("registered", () => ["Email"])
						.with("emr", () => [
							"Primer Nombre",
							"Apellido",
							"Fecha de Nacimiento",
							"Cedula",
						])
						.with("datasalud", () => [
							"Primer Nombre",
							"Apellido",
							"Fecha de Nacimiento",
							"Cedula",
							"Email",
						])
						.exhaustive()}
				/>
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

export default UsersSearch;
