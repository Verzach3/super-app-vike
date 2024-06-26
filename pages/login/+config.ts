import MantineWrapper from "@/components/MantineWrapper";
import type { Config } from "vike/types";

const config = {
	Wrapper: MantineWrapper,
	// firebase-ui only supports client-side rendering
	ssr: false,
} satisfies Config;

export default config;
