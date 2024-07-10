import { getXataClient } from "@/db/xata.server";
import type { Product } from "@/types/DBTypes";

export async function onCreateProduct(product: Product) {
	const xata = getXataClient();

	if (!product) return "";

	try {
		await xata.db.products.create(product);
	} catch (error) {
		console.log("Error: ", error);
	}
}
