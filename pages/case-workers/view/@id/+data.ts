import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";

export type CaseWorkerData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	const caseData = await xata.db.case_workers
		.filter({ "patient.user_id": pageContext.routeParams?.id })
    .select(["patient.*", "worker.*"])
		.getFirst();
	if (!caseData) {
		return { caseData: null };
	}
	try {
		const files = await pageContext.webdav.getDirectoryContents(
			`/${pageContext.routeParams?.id ?? ""}`,
		);
		console.log(files);
		return { caseData, files };
	} catch (error) {
		console.error(error);
	}
	return { caseData, files: [] };
}
