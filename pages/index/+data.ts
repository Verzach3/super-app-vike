import { getXataClient } from "@/db/xata.server";
import { PageContext } from "vike/types";

export async function data(pageContext: PageContext) {
  const xata = getXataClient();
  const uid = pageContext.user?.uid;
  const role = "admin";
  const asignedRole = await xata.db.asigned_roles.filter({
    user_uid: uid,
    "asigned_role.type": role,
  }).getFirst();

  if (!asignedRole){
    return "/patient"
  }

  return "/dashboard"
}