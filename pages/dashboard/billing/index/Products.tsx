import {
	TextInput,
	Grid,
	Card,
	Text,
	NumberFormatter,
	Group,
  Affix,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Edit, Trash, UserRoundPlus } from "lucide-react";

function Products() {
	return (
		<div>
			<TextInput m={"md"} leftSection={<IconSearch />} placeholder="Buscar" />
			<Grid mx={"md"}>
				<Grid.Col span={4}>
					<Card withBorder>
						<Text fw={700} size="lg">Producto 1</Text>
						<Text mb={"md"}>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
							accusantium provident fugiat minima culpa earum vero repudiandae
							blanditiis doloremque consectetur ullam itaque, commodi illum
							quaerat. In iusto est eaque aliquam?
						</Text>
						<Group grow justify="end">
								<Text ta={"right"} fw={700} size="lg">
									<NumberFormatter
										prefix="$ "
										value={1000000}
										thousandSeparator
									/>
								</Text>
						</Group>
            <Group>
              <ActionIcon variant="transparent">
                <Edit/>
              </ActionIcon>
              <ActionIcon variant="transparent" c={"red"}>
                <Trash/>
              </ActionIcon>
              <ActionIcon variant="transparent" c={"green"}>
                <UserRoundPlus/>
              </ActionIcon>
            </Group>
					</Card>
				</Grid.Col>
				<Grid.Col span={4}>
					<div>Producto 2</div>
				</Grid.Col>
				<Grid.Col span={4}>
					<div>Producto 3</div>
				</Grid.Col>
			</Grid>

		</div>
	);
}

export default Products;
