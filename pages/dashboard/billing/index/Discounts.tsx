import {
	Group,
	Card,
	Text,
	Grid,
	TextInput,
	Button,
	ActionIcon,
	Badge,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Edit, Trash } from "lucide-react";

function Discounts() {
	return (
		<div>
			<TextInput placeholder="Buscar" leftSection={<IconSearch />} m={"md"} />
			<Grid mx={"md"}>
				<Grid.Col span={4}>
					<Card withBorder>
						<Group grow justify="space-between" mb={"sm"}>
							<Group grow justify="space-between">
								<Text fw={700} size="lg">
									CODIGO
								</Text>
							</Group>
							<Group justify="end">
								<ActionIcon variant="transparent">
									<Edit />
								</ActionIcon>
								<ActionIcon variant="transparent" c={"red"}>
									<Trash />
								</ActionIcon>
							</Group>
						</Group>
						<Card.Section>
							<Group grow bg={"gray.2"} px={"md"}>
								<Text>Descuento: 10%</Text>
							</Group>
						</Card.Section>
					</Card>
				</Grid.Col>
			</Grid>
		</div>
	);
}

export default Discounts;
