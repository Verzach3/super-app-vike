import type { FirebaseApp } from "firebase/app";
import type { UserRecord } from "firebase-admin/auth";
import type { Low } from "lowdb";
import type { CacheData } from "./server-entry";
import type { WebDAVClient } from "webdav";

declare module "hono" {
	interface ContextVariableMap {
		user?: UserRecord | null;
		cache: Low<CacheData>;
		webdav: WebDAVClient;
	}
}

declare global {
	namespace Vike {
		interface PageContext {
			user?: UserRecord | null;
			cache: Low<CacheData>;
			webdav: WebDAVClient;
		}
		interface Config {
			firebaseApp?: FirebaseApp;
		}
	}
}
