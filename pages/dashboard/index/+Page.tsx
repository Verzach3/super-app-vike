import {
	Card,
	Center,
	Container,
	Group,
	Loader,
	Stack,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { FileStack, UsersRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSurveysCount } from "@/functions/getSurveysCount.telefunc";
import { getUserCount } from "@/functions/getUserCount.telefunc";
function Page() {
	const { data: userAmount, isLoading: isLoadingUsers } = useQuery({
		queryKey: ["getUsers"],
		queryFn: getUserCount,
	});
	const { data: surveyAmount, isLoading: isLoadingSurveys } = useQuery({
		queryKey: ["getSurveys"],
		queryFn: getSurveysCount,
	});
	return (
		<Container mt={"lg"}>
			<Group grow>
				<Stack>
					<Title fw={800} mb={"md"}>Bienvenido a WellFit Platform</Title>
					<Group grow>
						<Card withBorder>
							<Center>
								<Group>
									<ThemeIcon variant="transparent" c={"gray"}>
										<UsersRound />
									</ThemeIcon>
									<Center>
										<Title c={"gray"}>
											Usuarios:{" "}
											{isLoadingUsers ? (
												<Loader size={"sm"} color={"gray"} />
											) : (
												userAmount
											)}
										</Title>
									</Center>
								</Group>
							</Center>
						</Card>
						<Card withBorder>
							<Center>
								<Group>
									<ThemeIcon variant="transparent" c={"gray"}>
										<FileStack />
									</ThemeIcon>
									<Center>
										<Title c={"gray"}>
											Encuestas:{" "}
											{isLoadingSurveys ? (
												<Loader size={"sm"} color={"gray"} />
											) : (
												surveyAmount
											)}
										</Title>
									</Center>
								</Group>
							</Center>
						</Card>
					</Group>
				</Stack>
			</Group>
		</Container>
	);
}

export default Page;
