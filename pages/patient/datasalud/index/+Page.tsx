import {
	ActionIcon,
	Card,
	Center,
	Container,
	Group,
	SimpleGrid,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconFile, IconX } from "@tabler/icons-react";

function DataSalud() {
	return (
		<Container mt={"md"}>
			<Title ta={"center"}>Tu DataSalud</Title>
			<SimpleGrid cols={6}>
				<Card shadow="sm">
					<Card.Section>
						<Group grow>
							<Group justify="right">
								<ActionIcon radius={"lg"} size={"xs"}>
									<IconX />
								</ActionIcon>
							</Group>
						</Group>
					</Card.Section>
					<Center>
						<Card withBorder w={"5rem"} h={"6rem"}>
							<Card.Section>
								<Center>
									<ThemeIcon size={"6rem"} variant="white">
										<IconFile style={{ width: "60%", height: "60%" }} />
									</ThemeIcon>
								</Center>
							</Card.Section>
						</Card>
					</Center>
					<Text ta={"center"}>Archivo.pdf</Text>
				</Card>
			</SimpleGrid>
		</Container>
	);
}

export default DataSalud;
