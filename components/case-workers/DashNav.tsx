import { Button, Code, Group, Text, UnstyledButton } from "@mantine/core";
import {
	IconCheckbox,
	IconLayoutDashboard,
	IconLogout,
	IconPlugConnected,
	IconPuzzle,
	IconReceipt,
	IconReport,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "../../styles/dashboard/DashNav.module.css";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";

const data = [
	{ link: "/case-workers", label: "Casos", icon: IconLayoutDashboard },
];

export function DashNav() {
	const pageContext = usePageContext();
	const [active, setActive] = useState("Casos");

	useEffect(() => {
		const current = pageContext.urlPathname.split("/").pop();
		for (const item of data) {
			if (item.link.split("/").pop() === current) {
				setActive(item.label);
			}
		}
		if (pageContext.urlPathname === "/case-workers") {
			setActive("Casos");
		}
	}, [pageContext]);

	const links = data.map((item) => (
		<UnstyledButton
			w={"100%"}
			className={classes.link}
			data-active={item.label === active || undefined}
			key={item.label}
			onClick={() => {
				setActive(item.label);
				navigate(item.link);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</UnstyledButton>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				<Group className={classes.header} justify="space-between">
					<Text style={{ fontFamily: "Inter" }} fw={900}>
						SuperApp
					</Text>
					<Code fw={700}>v0.0.1</Code>
				</Group>
				{links}
			</div>

			{/* <UserButton session={session ?? undefined} /> */}
			<Group>
				<Button
					onClick={() => {
						navigate("/logout");
					}}
					leftSection={<IconLogout stroke={1.5} />}
				>
					Cerrar Sesion
				</Button>
			</Group>
		</nav>
	);
}
