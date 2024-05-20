import {
	Button,
	Center,
	Grid,
	Group,
	Input,
	rem,
	SegmentedControl,
	Title,
} from "@mantine/core";
import {
	IconChevronDown,
	IconLayoutGrid,
	IconLayoutList,
	IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { CreateSurveyModal } from "@/components/dashboard/surveys/CreateSurveyModal";
import { SurveyItem } from "@/components/dashboard/surveys/SurveyItem";
import { useData } from "vike-react/useData";
import type { SurveysPageData } from "./+data";
import { navigate } from "vike/client/router";

function DashboardSurveys() {
	const data = useData<SurveysPageData>();
	const [createOpened, { open: openCreate, close: closeCreate }] =
		useDisclosure(false);
	const [asignSearch, setAsignSearch] = useState<string>("");
	const loaderData = { data: [], error: "" };
	useEffect(() => {
		console.log(loaderData);
	}, [loaderData]);

	return (
		<>
			<CreateSurveyModal opened={createOpened} onClose={closeCreate} />
			<div style={{ margin: "1rem" }}>
				<Group grow justify={"space-between"}>
					<Title style={{ fontFamily: "Inter" }}>Encuestas</Title>
					<Group justify={"flex-end"}>
						<Button
							radius={"lg"}
							variant={"light"}
							rightSection={<IconChevronDown />}
						>
							Programas
						</Button>
						<SegmentedControl
							radius={"lg"}
							color={"blue"}
							data={[
								{
									value: "grid",
									label: (
										<Center style={{ gap: 10 }}>
											<IconLayoutGrid
												style={{ width: rem(16), height: rem(16) }}
											/>
										</Center>
									),
								},
								{
									value: "list",
									label: (
										<Center style={{ gap: 10 }}>
											<IconLayoutList
												style={{ width: rem(16), height: rem(16) }}
											/>
										</Center>
									),
								},
							]}
						/>
						<Button radius={"lg"} onClick={openCreate}>
							Crear
						</Button>
					</Group>
				</Group>
				<Group style={{ marginBottom: "1rem", marginTop: "1rem" }}>
					<Input style={{ flex: 1 }} />
					<Button
						variant="light"
						style={{ marginLeft: "1rem" }}
						rightSection={<IconSearch />}
					>
						Search
					</Button>
				</Group>
				<Grid mb={"md"}>
					{data.surveys.map((survey) => {
						return (
							<Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={survey.id}>
								<SurveyItem
									title={survey.name}
									responses={data.surveyAnswers[survey.id]}
									assigned={data.surveyAsignees[survey.id]}
									surveyId={survey.id}
									percentage={0}
									lastResponse="Test"
								/>
							</Grid.Col>
						);
					})}
				</Grid>
			</div>
		</>
	);
}

export default DashboardSurveys;
