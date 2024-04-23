import {Config} from "vike/types";

const config = {
  // firebase-ui only supports client-side rendering
  ssr: false,
} satisfies Config;

export default config;
