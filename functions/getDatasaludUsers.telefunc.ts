import { getXataClient } from "@/db/xata.server";

export async function getDatasaludUsers() {
  const xata = getXataClient();
  const users = await xata.db.datasalud.getPaginated({
    
    pagination: {
      size: 10,
    },
  });
}