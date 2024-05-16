import { firebaseAdmin } from "./libs/firebaseAdmin";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { getAuth } from "firebase-admin/auth";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
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

new CronJob("*/50 * * * *",
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


const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = new Hono();

app.use(compress());

if (isProduction) {
  app.use(
    "/*",
    serveStatic({
      root: `dist/client/`,
    }),
  );
}

app.use(async (c, next) => {
  // set the cache on the Hono event context
  c.set("cache", cache);
  const sessionCookie: string = getCookie(c, "__session") || "";
  if (sessionCookie) {
    const auth = getAuth(firebaseAdmin);
    try {
      const decodedIdToken = await auth.verifySessionCookie(
        sessionCookie,
        true,
      );
      const user = await auth.getUser(decodedIdToken.sub);
      c.set("user", user);
    } catch (error) {
      console.debug("verifySessionCookie:", error);
      c.set("user", null);
    }
  }
  await next();
});

app.post("/api/sessionLogin", async (c) => {
  const body = await c.req.json();
  const idToken: string = body.idToken || "";

  let expiresIn = 34560000; // 5 days. The auth.createSessionCookie() function of Firebase expects time to be specified in miliseconds.

  const auth = getAuth(firebaseAdmin);
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };

    expiresIn = 60 * 60 * 24 * 5; // 5 days. The setCookie() function of Hono expects time to be specified in seconds.
    setCookie(c, "__session", sessionCookie, options);

    return c.json({ status: "success" }, 200);
  } catch (error) {
    console.error("createSessionCookie failed :", error);
    return c.text("Unathorized", 401);
  }
});

app.post("/api/sessionLogout", (c) => {
  deleteCookie(c, "__session");
  return c.text("Logged Out", 200);
});

app.post("/_telefunc", async (c) => {
  const httpResponse = await telefunc({
    url: c.req.url.toString(),
    method: c.req.method,
    body: await c.req.text(),
    context: {
      cache: c.get("cache"),
      ...c
    },
  });
  const { body, statusCode, contentType } = httpResponse;

  c.status(statusCode);
  c.header("Content-Type", contentType);

  return c.body(body);
});

app.all("*", async (c, next) => {
  const pageContextInit = {
    urlOriginal: c.req.url,
    user: c.get("user"),
    cache: c.get("cache"),
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) {
    return next();
  } else {
    const { body, statusCode, headers } = httpResponse;
    headers.forEach(([name, value]) => c.header(name, value));
    c.status(statusCode);

    return c.body(body);
  }
});

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port: port,
  });
}

export default app;
