import { getXataClient } from "@/db/xata.server";
import type { PageContext } from "vike/types";

export type SurveyData = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
	const xata = getXataClient();
	const res = await xata.db.surveys.read(pageContext.routeParams?.id ?? "");
	console.log(res);
	return res;
}
