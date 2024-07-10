import { useDisclosure } from "@mantine/hooks";
import { Affix, Button, Tabs, Modal, TextInput } from "@mantine/core";
import Products from "./Products";
import Discounts from "./Discounts";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { onCreateProduct } from "./demo.telefunc";
import type { Product } from "@/types/DBTypes";

function Billing() {
	const [activeTab, setActiveTab] = useState("products");
	const [opened, { open, close }] = useDisclosure(false);
	const [formData, setFormData] = useState<Product>({
		product_name: "",
		description: "",
		price: 0,
		stock: 0,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "price" || name === "stock" ? +value : value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		createProduct(formData);
		close();
	};

	const createProduct = async (item: Product) => {
		await onCreateProduct(item)
		return "";
	};

	return (
		<>
			<Tabs
				defaultValue={"products"}
				value={activeTab}
				onChange={(v) => setActiveTab(v ?? "")}
			>
				<Tabs.List>
					<Tabs.Tab value="products">Productos</Tabs.Tab>
					<Tabs.Tab value="discounts">Descuentos</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="products">
					<Products />
				</Tabs.Panel>
				<Tabs.Panel value="discounts">
					<Discounts />
				</Tabs.Panel>
			</Tabs>

			<Modal opened={opened} onClose={close} title="Crear Producto">
				<form onSubmit={handleSubmit}>
					<div className="createProduct">
						<TextInput
							label="Nombre"
							placeholder="Nombre del producto"
							name="product_name"
							value={formData.product_name}
							onChange={handleChange}
						/>
						<TextInput
							label="Descripción"
							placeholder="Descripción del producto"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
						<TextInput
							label="Precio"
							placeholder="Precio del producto"
							name="price"
							value={formData.price.toString()}
							onChange={handleChange}
						/>
						<TextInput
							label="Stock"
							placeholder="Stock disponible"
							name="stock"
							value={formData.stock.toString()}
							onChange={handleChange}
						/>
					</div>

					<Button type="submit">Crear Producto</Button>
				</form>
			</Modal>

			<Affix position={{ bottom: 20, right: 20 }}>
				{activeTab === "products" && (
					<Button onClick={open} leftSection={<IconPlus />}>
						Agregar Producto
					</Button>
				)}
				{activeTab === "discounts" && (
					<Button leftSection={<IconPlus />}>Agregar Descuento</Button>
				)}
			</Affix>
		</>
	);
}

export default Billing;
