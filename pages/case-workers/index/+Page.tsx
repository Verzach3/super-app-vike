import {
	ActionIcon,
	Card,
	Center,
	Container,
	Grid,
	Group,
	Text,
	Title,
} from "@mantine/core";
import { useData } from "vike-react/useData";
import type { CaseWorkerCases } from "./+data";
import { Eye } from "lucide-react";
import { navigate } from "vike/client/router";

function CaseWorkers() {
	const data = useData<CaseWorkerCases>();
	return (
		<Container>
			<Title mt={"md"}>Casos asignados</Title>
			<Grid mt={"xl"}>
				{data.cases.records.map((record) => (
					<Grid.Col span={4} key={record.id}>
						<Card withBorder>
							<Group justify="space-between">
								<Text>
									{record.patient?.name} {record.patient?.lastname}
								</Text>
								<ActionIcon variant="transparent" c={"gray"} onClick={() => {
                  navigate(`/case-workers/view/${record.patient?.user_id}`);
                }}>
									<Eye />
								</ActionIcon>
							</Group>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
}

export default CaseWorkers;
