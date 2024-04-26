import React from "react";
import { Counter } from "./Counter.js";
import { navigate } from "vike/client/router";

export default function Page() {
  navigate("/patient");
  return null;
}
