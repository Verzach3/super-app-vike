import {FirebaseApp} from "firebase/app";
import type { UserRecord } from "firebase-admin/auth";

declare module "h3" {
  interface H3EventContext {
    user: UserRecord | null;
  }
}

declare global {
  // eslint-disable-next-line
  namespace Vike {
    interface PageContext {
      user?: UserRecord | null;
    }
    interface Config {
      firebaseApp?: FirebaseApp;
    }
  }
}

export {};