import { getXataClient } from "@/db/xata.server";



export const onShowProducts = async () => {
    const xata = getXataClient();
    try {
        const products = await xata.db.products.getMany();
        return products;
    } catch (error) {
        console.log(error);
    }
}