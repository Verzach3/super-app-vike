import {
	Card,
	Container,
	Grid,
	Group,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { useData } from "vike-react/useData";
import type { CaseWorkerCases } from "./+data";
import { UserIcon } from "lucide-react";
import { navigate } from "vike/client/router";

function CaseWorkers() {
	const data = useData<CaseWorkerCases>();
	return (
		<Container>
			<Title mt={"md"}>Casos asignados</Title>
			<Grid mt={"xl"}>
				{data.cases.records.map((record) => (
					<Grid.Col span={4} key={record.id}>
						<Card
							withBorder
							onClick={() => {
								navigate(`/case-workers/view/${record.patient?.user_id}`);
							}}
						>
							<Group justify="center">
								<ThemeIcon size={"xl"} radius={"xl"} bg={"gray.5"}>
									<UserIcon size={"2rem"} />
								</ThemeIcon>
							</Group>
							<Text ta={"center"} mt={"md"} fw={600}>
								{record.patient?.name} {record.patient?.lastname}
							</Text>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
}

export default CaseWorkers;
