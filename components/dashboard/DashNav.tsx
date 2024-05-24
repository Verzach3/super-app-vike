import { Button, Code, Group, Text, UnstyledButton } from "@mantine/core";
import {
	IconCheckbox,
	IconFileDescription,
	IconLayoutDashboard,
	IconLogout,
	IconPlugConnected,
	IconPuzzle,
	IconReceipt,
	IconReport,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { UserButton } from "@/components/dashboard/UserButton";
import classes from "../../styles/dashboard/DashNav.module.css";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";

const data = [
	{ link: "/dashboard", label: "Inicio", icon: IconLayoutDashboard },
	{ link: "/dashboard/surveys", label: "Encuestas", icon: IconCheckbox },
	{ link: "/dashboard/surveys/results", label: "Resultados", icon: IconReport },
	{ link: "/dashboard/users", label: "Usuarios", icon: IconUsers },
	{
		link: "/dashboard/caseworkers",
		label: "Case Workers",
		icon: IconFileDescription,
	},
	{ link: "/dashboard/billing", label: "Pagos y Productos", icon: IconReceipt },
	{
		link: "/dashboard/integrations",
		label: "Integraciones",
		icon: IconPlugConnected,
	},
	{ link: "/dashboard/modules", label: "Modulos", icon: IconPuzzle },
	{ link: "/dashboard/settings", label: "Ajustes", icon: IconSettings },
];

export function DashNav() {
	const pageContext = usePageContext();
	const [active, setActive] = useState("Inicio");

	async function handleLogout() {
		// await supabase.auth.signOut();
	}

	useEffect(() => {
		const current = pageContext.urlPathname.split("/").pop();
		for (const item of data) {
			if (item.link.split("/").pop() === current) {
				setActive(item.label);
			}
		}
		if (pageContext.urlPathname === "/dashboard") {
			setActive("Inicio");
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

			<div className={classes.footer}>
				{/* <UserButton session={session ?? undefined} /> */}
				<Button
					className={classes.link}
					onClick={(event) => {
						event.preventDefault();
						handleLogout().then((r) => console.log(r));
					}}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</Button>
			</div>
		</nav>
	);
}
