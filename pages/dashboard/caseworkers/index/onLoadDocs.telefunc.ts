import { getXataClient } from "@/db/xata.server";

export async function onLoadDocs() {
  const xata = getXataClient();
  const docs = await xata.db.datasalud.getPaginated({
    pagination: {
      size: 10,
    },
  });
}