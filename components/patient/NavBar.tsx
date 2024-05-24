import { useEffect, useRef, useState } from "react";
import {
	UnstyledButton,
	Tooltip,
	Title,
	rem,
	Text,
	Image,
	Group,
	ThemeIcon,
	Modal,
	Button,
	Badge,
} from "@mantine/core";
import {
	IconHome2,
	IconCalendarMonth,
	IconFileSpreadsheet,
	IconFirstAidKit,
	IconFileInvoice,
	IconLibrary,
	IconMessages,
	IconLogout2,
	IconLock,
} from "@tabler/icons-react";
import classes from "@/styles/patient/NavBar.module.css";
import autoAnimate from "@formkit/auto-animate";
import { navigate } from "vike/client/router";
import wellfit_logo from "@/assets/logo.svg";
import { useDisclosure } from "@mantine/hooks";

const mainLinksLabel = [
	{ icon: IconHome2, label: "Inicio" },
	{ icon: IconCalendarMonth, label: "Citas" },
	{ icon: IconFileSpreadsheet, label: "Registros" },
	{ icon: IconFirstAidKit, label: "Reciba Atencion" },
	{ icon: IconFileInvoice, label: "Pagar Factura" },
	{ icon: IconLibrary, label: "Recursos Para Pacientes" },
	{ icon: IconMessages, label: "Mensajes" },
];

type MainLinksLabels = (typeof mainLinksLabel)[number]["label"];

type LinksType = {
	[K in MainLinksLabels]: {
		name: string;
		path?: string;
		soon?: boolean;
		new?: boolean;
	}[];
};

const navLinks: LinksType = {
	Inicio: [
		{ name: "Inicio", path: "/patient/" },
		{ name: "Datasalud", path: "/patient/datasalud", new: true },
		{ name: "Analisis", path: "/patient/lab-results", soon: true },
		{ name: "Medicamentos", path: "/patient/medications", soon: true },
		{ name: "Encuestas", path: "/patient/surveys" },
		{ name: "Receta medica", soon: true },
		{ name: "Pagar Factura", soon: true },
	],
	Citas: [{ name: "Tus citas", soon: true }],
	Registros: [
		{ name: "Historias clinicas", soon: true },
		{ name: "Analisis", path: "/patient/lab-results", soon: true },
		{ name: "Diagnosticos", soon: true },
		{ name: "Imagenes", soon: true },
		{ name: "Documentos", soon: true },
		{ name: "Alergias", soon: true },
		{ name: "Condiciones de Salud", soon: true },
		{ name: "Vacunaciones", soon: true },
		{ name: "Medicamentos", path: "/patient/medications", soon: true },
		{ name: "Receta medica", soon: true },
		{ name: "Valores clinicos", soon: true },
		{ name: "Procedimientos", soon: true },
	],
	"Reciba Atencion": [
		{ name: "Programar una cita", soon: true },
		{ name: "Atencion el mismo dia", soon: true },
		{ name: "Ver ubicaciones", soon: true },
		{ name: "Salud de la mujer", soon: true },
	],
	"Pagar Factura": [
		{ name: "Pendientes", soon: true },
		{ name: "Historial de pagos", soon: true },
		{ name: "Metodos de pago", soon: true },
	],
	"Recursos Para Pacientes": [
		{ name: "Recursos Masculinos", soon: true },
		{ name: "Recursos Femeninos", soon: true },
	],
	Mensajes: [
		{ name: "Mensajes", soon: true },
		{ name: "Notificaciones", soon: true },
		{ name: "Alertas", soon: true },
		{ name: "Recordatorios", soon: true },
	],
};

export default function NavBar() {
	const [active, setActive] = useState<MainLinksLabels>("Inicio");
	const [activeLink, setActiveLink] = useState("Settings");
	const [opened, { toggle }] = useDisclosure(false);
	const parent = useRef(null);
	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, []);
	const mainLinks = mainLinksLabel.map((link) => (
		<Tooltip
			label={link.label}
			position="right"
			withArrow
			transitionProps={{ duration: 0 }}
			key={link.label}
		>
			<UnstyledButton
				onClick={() => setActive(link.label)}
				className={classes.mainLink}
				data-active={link.label === active || undefined}
			>
				<link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	));

	const links = navLinks[active].map((link) => (
		<a
			key={link.name}
			style={{
				width: "100%",
			}}
			className={classes.link}
			data-active={activeLink === link.name || undefined}
			href={link.path || "#"}
			onClick={(event) => {
				event.preventDefault();
				if (link.soon) {
					event.stopPropagation();
					toggle();
				} else {
					setActiveLink(link.name);
					void navigate(link.path || "/patient/");
				}
			}}
		>
			<Group grow justify="space-between" maw={"100%"}>
				{link.name}
				{link.soon && (
					<Group justify="right" mr={"md"} align="center">
						<ThemeIcon
							color="gray"
							variant="light"
							w={"fit-content"}
							size={"md"}
						>
							<IconLock style={{ width: "70%", height: "70%" }} />
						</ThemeIcon>
					</Group>
				)}
				{link.new && (
					<Group justify="right" mr={"md"} align="center">
						<Badge
							size="sm"
							variant="gradient"
							gradient={{ from: "cyan", to: "lime", deg: 90 }}
						>
							Nuevo
						</Badge>
					</Group>
				)}
			</Group>
		</a>
	));

	return (
		<>
			<Modal opened={opened} onClose={toggle} centered withCloseButton={false}>
				<div style={{ padding: "1rem" }}>
					<Title order={4} style={{ marginBottom: "1rem" }}>
						Proximamente
					</Title>
					<Text>
						Esta funcionalidad estara disponible en el futuro, quedate atento a
						nuestras redes.
					</Text>
					<Button mt={"md"} onClick={toggle}>
						<Text>Entendido</Text>
					</Button>
				</div>
			</Modal>
			<div className={classes.navbar}>
				<div className={classes.wrapper}>
					<div className={classes.aside}>
						<div style={{ height: "100%" }}>
							<div className={classes.logo}>
								<Image src={wellfit_logo} h={"2rem"} w={"2rem"} />
							</div>
							{mainLinks}
						</div>
						<div>
							<UnstyledButton
								onClick={() => {}}
								className={classes.mainLink}
								style={{ marginBottom: "1rem" }}
							>
								<IconLogout2
									style={{ width: rem(22), height: rem(22) }}
									stroke={1.5}
								/>
							</UnstyledButton>
						</div>
					</div>
					<div className={classes.main} ref={parent}>
						<Title order={4} className={classes.title}>
							{active}
						</Title>
						{links}
					</div>
				</div>
			</div>
		</>
	);
}
