import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Head from "../layouts/HeadDefault.js";

// Default config (can be overridden by pages)
export default {
	Head,
	passToClient: ["user"],
	// <title>
	title: "WellFit Platform",
	extends: vikeReact,
} satisfies Config;
