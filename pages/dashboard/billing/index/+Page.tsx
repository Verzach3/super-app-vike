import { Affix, Button, Tabs } from "@mantine/core";
import Products from "./Products";
import Discounts from "./Discounts";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

function Billing() {
  const [activeTab, setActiveTab] = useState("products");
	return (
		<>
			<Tabs defaultValue={"products"} value={activeTab} onChange={(v) => setActiveTab(v ?? "")}>
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

			<Affix position={{ bottom: 20, right: 20 }}>
        { activeTab === "products" && <Button leftSection={<IconPlus />}>Agregar Producto</Button>}
        { activeTab === "discounts" && <Button leftSection={<IconPlus />}>Agregar Descuento</Button>}
      </Affix>
		</>
	);
}

export default Billing;
