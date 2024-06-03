import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/dropzone/styles.css';
import type React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "jotai";
import { AtomStore } from "@/state/Store";
const theme = createTheme({
	/** Your theme override here */
	fontFamily: "Inter, sans-serif",
});

function MantineWrapper({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={AtomStore}>
			<MantineProvider theme={theme}>
				<Notifications position={"top-right"} />
				{children}
			</MantineProvider>
		</Provider>
	);
}

export default MantineWrapper;
