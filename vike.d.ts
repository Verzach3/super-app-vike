import {FirebaseApp} from "firebase/app";
import type { UserRecord } from "firebase-admin/auth";
import type { Low } from "lowdb"
import type { CacheData } from "./server-entry";

declare module "hono" {
  interface ContextVariableMap {
    user?: UserRecord | null;
    cache: Low<CacheData>
  }
}

declare global {
  // eslint-disable-next-line
  namespace Vike {
    interface PageContext {
      user?: UserRecord | null;
      cache: Low<CacheData>
    }
    interface Config {
      firebaseApp?: FirebaseApp;
    }
  }
}


export {};