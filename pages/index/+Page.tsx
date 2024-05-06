import React, { useEffect } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";

export default function Page() {
  const nextPath = useData();
  useEffect(() => {
    navigate(`${nextPath}`);
  })
  return null;
}
