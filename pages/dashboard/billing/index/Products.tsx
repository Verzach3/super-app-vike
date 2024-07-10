import { useState, useEffect } from "react";
import {
	TextInput,
	Grid,
	Card,
	Text,
	NumberFormatter,
	Group,
	ActionIcon,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Edit, Trash, UserRoundPlus } from "lucide-react";
import type { Product } from "@/types/DBTypes";
import { onShowProducts } from "./onShowProducts.telefunc";

function Products() {
	const [product, setProduct] = useState<Product[]>([]);

	useEffect(() => {
		const loadProducts = async () => {
			const response = await onShowProducts();
			if (response) {
				const data = response.map((item) => ({
					id: item.id ?? "",
					description: item.description ?? "",
					price: item.price ?? 0,
					product_name: item.product_name ?? "",
					stock: item.stock ?? 0,
				}));
				setProduct(data);
			}
		};
		loadProducts();
	}, []);

	return (
		<div>
			<TextInput m={"md"} leftSection={<IconSearch />} placeholder="Buscar" />
			<Grid mx={"md"}>
				{product.map((item, index) => (
					<Grid.Col span={4} key={item.id}>
						<Card withBorder>
							<Text fw={700} size="lg">
								{item.product_name}
							</Text>
							<Text mb={"md"}>
								{item.description}
							</Text>
							<Group grow justify="end">
								<Text ta={"right"} fw={700} size="lg">
									<NumberFormatter
										prefix="$ "
										value={item.price}
										thousandSeparator
									/>
								</Text>
							</Group>
							<Group>
								<ActionIcon variant="transparent">
									<Edit />
								</ActionIcon>
								<ActionIcon variant="transparent" c={"red"}>
									<Trash />
								</ActionIcon>
								<ActionIcon variant="transparent" c={"green"}>
									<UserRoundPlus />
								</ActionIcon>
							</Group>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</div>
	);
}

export default Products;
