import { useEffect } from "react";
import { navigate } from "vike/client/router";

function Logout() {
	useEffect(() => {
    logout();
  }, []);

	async function logout() {
		await fetch("/api/sessionLogout", {
			method: "POST",
		});
		await navigate("/");
	}

	return null;
}

export default Logout;
