import "dotenv/config";
import { createServer } from "node:http";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { firebaseAdmin } from "./libs/firebaseAdmin";
import installCrypto from "@hattip/polyfills/crypto";
import installGetSetCookie from "@hattip/polyfills/get-set-cookie";
import installWhatwgNodeFetch from "@hattip/polyfills/whatwg-node";
import { getAuth } from "firebase-admin/auth";
import {
  createApp,
  createRouter,
  deleteCookie,
  eventHandler,
  fromNodeMiddleware,
  getCookie,
  getResponseStatus,
  getResponseStatusText,
  readBody,
  setCookie,
  setResponseHeaders,
  setResponseStatus,
  toNodeListener,
  toWebRequest,
} from "h3";
import serveStatic from "serve-static";
import { telefunc } from "telefunc";
import { renderPage } from "vike/server";
import { Memory, Low } from "lowdb"
import { CronJob } from "cron";
import { getAuthToken } from "./libs/emr/getAuthToken";

export type CacheData = {
  emr_token: string;
}
const cache = new Low<CacheData>(new Memory(), { emr_token: "" });

try {
  const token = await getAuthToken();
  cache.data.emr_token = token ?? "";
  await cache.write()
  console.log("EMR Token Renewed");
} catch (error) {
  console.error("EMR Token Renew Error:", error);
}

const emrTokenRenweJob = new CronJob("*/50 * * * *",
  async () => {
    try {
      const token = await getAuthToken();
      cache.data.emr_token = token ?? "";
      await cache.write()
    } catch (error) {
      console.error("EMR Token Renew Error:", error);
    }
  },
  () => { console.log("EMR Token Renewed")},
  true,
  "America/Bogota"
);


installWhatwgNodeFetch();
installGetSetCookie();
installCrypto();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT
  ? parseInt(process.env.HMR_PORT, 10)
  : 24678;

void startServer();

async function startServer() {
  const app = createApp();

  if (isProduction) {
    app.use("/", fromNodeMiddleware(serveStatic(`${root}/dist/client`)));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true, hmr: { port: hmrPort } },
      })
    ).middlewares;
    app.use(fromNodeMiddleware(viteDevMiddleware));
  }

  const router = createRouter();

  app.use(
    eventHandler(async (event) => {
      // Initialize the cache on the H3 event context
      event.context.cache = cache;
      const sessionCookie = getCookie(event, "__session");
      if (sessionCookie) {
        try {
          const auth = getAuth(firebaseAdmin);
          const decodedIdToken = await auth.verifySessionCookie(sessionCookie);
          const user = await auth.getUser(decodedIdToken.sub);
          event.context.user = user;
        } catch (error) {
          console.debug("verifySessionCookie:", error);
          event.context.user = null;
        }
      }
    }),
  );

  router.post(
    "/api/sessionLogin",
    eventHandler(async (event) => {
      const body = await readBody(event);
      const idToken: string = body.idToken || "";

      let status: number;
      let text: string;

      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

      try {
        const auth = getAuth(firebaseAdmin);
        const sessionCookie = await auth.createSessionCookie(idToken, {
          expiresIn,
        });
        setCookie(event, "__session", sessionCookie, {
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        });
        setResponseStatus(event, 200, "Success");

        status = getResponseStatus(event);
        text = getResponseStatusText(event);
      } catch (error) {
        console.error("createSessionCookie:", error);
        setResponseStatus(event, 401, "Unauthorized Request");
        status = getResponseStatus(event);
        text = getResponseStatusText(event);
      }

      return {
        status,
        text,
      };
    }),
  );

  router.post(
    "/api/sessionLogout",
    eventHandler((event) => {
      deleteCookie(event, "__session");
      setResponseStatus(event, 200, "Logged Out");
      return "Logged Out";
    }),
  );

  router.post(
    "/_telefunc",
    eventHandler(async (event) => {
      const request = toWebRequest(event);
      const httpResponse = await telefunc({
        url: request.url.toString(),
        method: request.method,
        body: await request.text(),
        context: event,
      });
      const { body, statusCode, contentType } = httpResponse;

      setResponseStatus(event, statusCode);
      setResponseHeaders(event, {
        "content-type": contentType,
      });

      return body;
    }),
  );

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  router.use(
    "/**",
    eventHandler(async (event) => {
      const pageContextInit = {
        urlOriginal: event.node.req.originalUrl || event.node.req.url!,
        user: event.context.user,
        // Pass the cache to the page context
        cache: cache,
      };

      const pageContext = await renderPage(pageContextInit);
      const response = pageContext.httpResponse;

      setResponseStatus(event, response?.statusCode);
      setResponseHeaders(event, Object.fromEntries(response?.headers ?? []));

      return response?.getBody();
    }),
  );

  app.use(router);

  const server = createServer(toNodeListener(app)).listen(port);

  server.on("listening", () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
