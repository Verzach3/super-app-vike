import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Head from "../layouts/HeadDefault.js";

// Default config (can be overridden by pages)
export default {
  Head,
  passToClient: ["user"],
  // <title>
  title: "My Vike App",
  extends: vikeReact,
  meta: {
    // Temporary workaround until +client.js is implemented: https://github.com/vikejs/vike/issues/1468
    firebaseApp: {
      env: { client: true },
    },
  },
} satisfies Config;
