import {redirect, render} from "vike/abort";
import type {GuardAsync} from "vike/types";
import {onUserCheck} from "@/pages/+guard.telefunc";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  if (pageContext.urlPathname === '/patient/finishProfile') {
    return
  }
  if (!pageContext.user) {
    throw redirect("/login", 302);
  }

  if (!(await onUserCheck(pageContext.user.uid))) {
    throw redirect("/patient/finishProfile", 302);
  }

  // if (!await xata.db.patient_profiles.read(pageContext.user.uid)) {
  //   redirect("/patient/finishProfile", 302);
  // }
};

export {guard};
