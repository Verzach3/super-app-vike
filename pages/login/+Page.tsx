import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  type UserCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { reload } from "vike/client/router";

export default Page;

function Page() {
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email ?? "", window.location.href)
        .then((result: UserCredential) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          sessionLogin(result)
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Code", errorCode);
          console.log("Message", errorMessage);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
      return () => {};
    }
  }, []);

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000/login",
    // This must be true.
    handleCodeInApp: true,
  };

  async function sendLink() {
    const auth = getAuth();
    try {
      await sendSignInLinkToEmail(
        auth,
        "gabriel.co.cardenas@gmail.com",
        actionCodeSettings
      );
      window.localStorage.setItem(
        "emailForSignIn",
        "gabriel.co.cardenas@gmail.com"
      );
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Code", errorCode);
      console.log("Message", errorMessage);
    }
  }

  async function sessionLogin(authResult: UserCredential) {
    const idToken = (await authResult.user.getIdToken()) || "";
    try {
      const response = await fetch("/api/sessionLogin", {
        method: "POST",
        body: JSON.stringify({ idToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await reload();
      } else {
        setError(response.statusText);
      }
      await getAuth().signOut();
    } catch (err) {
      console.log("error :", err);
    }
  }

  return (
    <>
      <button onClick={sendLink}>Send Link</button>
    </>
  );
}
