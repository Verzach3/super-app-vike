import {
	ActionIcon,
	Badge,
	Card,
	Center,
	Container,
	Group,
	Menu,
	rem,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import {
	IconDots,
	IconGlobe,
	IconMessageCircle,
	IconPencil,
	IconPlanet,
	IconSettings,
	IconUser,
	IconWorld,
} from "@tabler/icons-react";
import { navigate, reload } from "vike/client/router";
import classes from "@/components/dashboard/surveys/SurveyItem.module.css";
import { onSetSurveyGlobal } from "./telefuncs/onSetSurveyGlobal.telefunc";
import { notifications } from "@mantine/notifications";

interface SurveyItemProps {
	title: string;
	lastResponse: string;
	responses: number;
	percentage: number;
	assigned: number;
	surveyId: string;
	global: boolean;
}

export function SurveyItem({
	title,
	lastResponse,
	responses,
	percentage,
	assigned,
	surveyId,
	global
}: SurveyItemProps) {
	return (
		<Card>
			<Card.Section>
				<Card
					className={classes.title}
					withBorder
					radius={"lg"}
					shadow={"md"}
					onClick={() => navigate(`/dashboard/surveys/view/${surveyId}`)}
				>
					<Card.Section>
						<Group ml={"md"} mt={"md"}>
							<Badge size={"md"} variant={"light"}>
								Programa
							</Badge>
							{global && <Badge color="green" size={"md"}>Global</Badge>}
						</Group>
					</Card.Section>
					<Card.Section>
						<Center>
							<Stack>
								<Container>
									<Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
										{responses}
									</Text>
									<Text
										size={"sm"}
										ta={"center"}
										ff={"Inter"}
										fw={600}
										c={"gray"}
									>
										Responses
									</Text>
								</Container>
							</Stack>
							<Stack>
								<Container my={"xl"}>
									<Center>
										<Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
											{percentage}
										</Text>
										<Text
											size={"1rem"}
											fw={700}
											ta={"center"}
											ff={"Inter"}
											c={"gray"}
											style={{ alignContent: "center" }}
										>
											%
										</Text>
									</Center>
									<Text
										size={"sm"}
										ta={"center"}
										ff={"Inter"}
										fw={600}
										c={"gray"}
									>
										Responses
									</Text>
								</Container>
							</Stack>
						</Center>
					</Card.Section>
					<Card.Section>
						<Container fluid mb={"xs"}>
							<Center style={{ justifyContent: "left" }}>
								<ThemeIcon variant={"white"} c={"gray"} size={"sm"}>
									<IconUser />
								</ThemeIcon>
								<Text size={"xs"} ff={"Inter"} fw={700}>
									{assigned} Asignados
								</Text>
							</Center>
						</Container>
					</Card.Section>
				</Card>
			</Card.Section>
			<Card.Section>
				<Group justify={"space-between"} wrap="nowrap">
					<Group grow my={"xs"} justify={"flex-start"} ml={"md"}>
						<Stack gap={0}>
							<Text
								className={classes.title}
								ta={"left"}
								size={"md"}
								ff={"Inter"}
								fw={600}
								truncate="end"
								onClick={() => navigate(`/dashboard/surveys/view/${surveyId}`)}
							>
								{title}
							</Text>
							<Text size={"xs"} ff={"Inter"} c={"gray"} fw={600}>
								Ultima respuesta: {lastResponse}
							</Text>
						</Stack>
					</Group>
					<Group justify="right">
						{/* Card Menu */}
						<Menu shadow="md" width={200}>
							<Menu.Target>
								<ActionIcon variant={"white"} c={"gray"} size={"md"} w={"100%"}>
									<IconDots />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Label>Opciones</Menu.Label>
								<Menu.Item
									onClick={(e) => {
										navigate(`/dashboard/surveys/edit/${surveyId}`);
									}}
									leftSection={
										<IconPencil style={{ width: rem(14), height: rem(14) }} />
									}
								>
									Editar
								</Menu.Item>
								<Menu.Item
									onClick={(e) => {
										onSetSurveyGlobal(surveyId, !global).then(async () => {
											notifications.show({
												title: "Encuesta activada",
												message: !global ? "Encuesta activada globalmente" : "Encuesta desactivada globalmente",
												color: "green",
											});
											await reload();
										});
										
									}}
									leftSection={
										<IconPlanet style={{ width: rem(14), height: rem(14) }} />
									}
								>
									{!global ? "Activar Global" : "Desactivar Global"}
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	);
}
