import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import MantineWrapper from "@/components/MantineWrapper";

// Default config (can be overridden by pages)
export default {
  passToClient: ["user"],
  // <title>
  title: "WellFit Platform",
  extends: vikeReact,
  Wrapper: MantineWrapper
} satisfies Config;