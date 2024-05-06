import { NothingFound } from "@/components/dashboard/error/404/NothingFound";
import { ServerError } from "@/components/dashboard/error/500/ServerError";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  if (is404) {
    return (
      <NothingFound/>
    );
  } else {
    return (
      <ServerError/>
    );
  }
}
