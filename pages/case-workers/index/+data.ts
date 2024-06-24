import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";

export type CaseWorkerCases = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const xata = getXataClient();
  const caseWorkers = await xata.db.case_workers.select(["patient.*", "worker.*"]).filter({ "worker.user_id": pageContext.user?.uid }).getPaginated({
    pagination: {
      size: 10,
    },
  });
  return { cases: caseWorkers };
}