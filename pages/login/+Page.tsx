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
import {
	LoadingOverlay,
	Title,
	Image,
	Box,
	Button,
	Center,
	Modal,
	Paper,
	TextInput,
	ThemeIcon,
	Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "@/styles/routes/auth.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import wellfit_logo from "@/assets/wellfit-bottom-text.svg";
import BannerInstruction from "@/components/login/BannerInstructions";
export default Page;

function Page() {
	const [error, setError] = useState("");
	const [isModalOpened, { close, open }] = useDisclosure();
	const [loading, setLoading] = useState<boolean>(true);
	const loginForm = useForm({
		initialValues: {
			email: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email invalido"),
		},
	});

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
					sessionLogin(result);
					// You can access the new user via result.user
					// Additional user info profile not available via:
					// result.additionalUserInfo.profile == null
					// You can check if the user is new or existing:
					// result.additionalUserInfo.isNewUser
				})
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
		setLoading(false);
	}, []);

	const actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be in the authorized domains list in the Firebase Console.
		url: `${
			process.env.NODE_ENV === "production"
				? "https://platform.wellfitclinic.com"
				: "http://localhost:3000"
		}/login`,
		// This must be true.
		handleCodeInApp: true,
	};

	async function sendLink(email: string) {
		const auth = getAuth();
		try {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);
			window.localStorage.setItem("emailForSignIn", email);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
			<Modal
				opened={isModalOpened}
				onClose={close}
				zIndex={2000}
				centered
				withCloseButton={false}
			>
				<Center>
					<Paper p={20} radius={0}>
						<Center mb={10}>
							<ThemeIcon radius={100} size={90}>
								<IconCheck size={50} stroke={1.5} />
							</ThemeIcon>
						</Center>
						<Title order={2} ta="center" mb={20} ff={"Inter"}>
							Se ha enviado un link a tu correo electronico
						</Title>
						<Text ta="center" mb={20} ff={"Inter"}>
							Revisa tu correo electronico y haz click en el link para continuar
						</Text>
					</Paper>
				</Center>
			</Modal>
			<BannerInstruction />
			<div className={classes.wrapper}>
				<Paper className={classes.form} radius={0} p={30}>
					<Box pos="relative">
						<LoadingOverlay
							visible={loading}
							zIndex={1000}
							overlayProps={{ radius: "sm", blur: 2 }}
						/>
						<Image src={wellfit_logo} h={200} fit={"contain"} />
						<Title
							order={2}
							className={classes.title}
							ta="center"
							mt="md"
							mb={50}
						>
							Bienvenido a WellFit
						</Title>
						<form
							onSubmit={loginForm.onSubmit(async (values) => {
								setLoading(true);
								await sendLink(values.email);
								setLoading(false);
								open();
							})}
						>
							<TextInput
								label="Correo Electronico"
								placeholder="hola@gmail.com"
								size="md"
								{...loginForm.getInputProps("email")}
							/>
							<Button fullWidth mt="xl" size="md" type={"submit"}>
								Ingresa o Registrate
							</Button>
						</form>
					</Box>
				</Paper>
			</div>
		</>
	);
}
