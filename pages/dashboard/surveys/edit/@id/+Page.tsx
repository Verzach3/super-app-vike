import SurveyCreatorWidget from "@/components/dashboard/surveys/SurveyCreatorWidget";
import { Card, Center, Group, Loader, Text } from "@mantine/core";
import { ClientOnly } from "vike-react/ClientOnly";
import { useData } from "vike-react/useData";
import type { SurveyData } from "./+data";
import { onSaveSurvey } from "./SurveySave.telefunc";
export default function Survey() {
	const data = useData<SurveyData>();
	return (
		<div
			style={{
				height: "100dvh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Group grow>
				<Card withBorder radius={0}>
					<Text ff={"Inter"} fw={800} size={"lg"}>
						Editando:{" "}
						<Text span c={"blue"}>
							{data?.name ?? "Survey"}
						</Text>
					</Text>
				</Card>
			</Group>
			<ClientOnly
				load={() =>
					import("@/components/dashboard/surveys/SurveyCreatorWidget")
				}
				fallback={
					<Center h={"100%"}>
						<Loader type="bars" />
					</Center>
				}
			>
				{(SurveyCreatorWidget) => (
					<SurveyCreatorWidget
						json={data?.json}
						id={data?.id ?? ""}
						onSaveSurvey={onSaveSurvey}
					/>
				)}
			</ClientOnly>
		</div>
	);
}
