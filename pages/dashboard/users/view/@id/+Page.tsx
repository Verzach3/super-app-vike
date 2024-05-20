import {
	ActionIcon,
	Affix,
	Avatar,
	Badge,
	Button,
	Card,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	IconCheck,
	IconFile,
	IconFiles,
	IconPhoto,
	IconPlus,
	IconX,
} from "@tabler/icons-react";

function ViewPatient() {
	return (
		<>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Button leftSection={<IconPlus />}>Iniciar Chat</Button>
			</Affix>
			<Container mt={"2.5rem"} pb={"2.5rem"}>
				<Title mb={"xl"}>Paciente</Title>
				<Card withBorder shadow="md">
					<Group grow justify="space-between">
						<Group>
							<Avatar size={"lg"} radius={0}></Avatar>
							<Group>
								<Stack gap={0}>
									<Text>Nombre</Text>
									<Text>Fecha Nacimiento</Text>
								</Stack>
							</Group>
						</Group>
						<Group justify="end">
							<Button>Editar</Button>
						</Group>
					</Group>
					<Group mt={"md"}>
						<Badge leftSection={<IconX size={14} />} color="red">
							Perfil de EMR
						</Badge>
						<Badge leftSection={<IconCheck size={14} />} color="green">
							Perfil Basico
						</Badge>
						<Badge leftSection={<IconX size={14} />} color="red">
							Perfil Completo
						</Badge>
					</Group>
					<Group mt={"sm"} mb={"md"} wrap="nowrap">
						<Button>Encuestas</Button>
						<Button leftSection={<IconFiles size={14} />}>Archivos</Button>
					</Group>
					<Divider />
					<Group mt={"md"}>
						<Title order={3}>Problemas Medicos</Title>
					</Group>
					<Divider />
					<Group grow>
						<Stack gap={0}>
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 1</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 2</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 3</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
						</Stack>
					</Group>
					<Divider />
					<Group mt={"md"}>
						<Title order={3}>Laboratorio</Title>
					</Group>
					<Divider />
					<Group grow>
						<Stack gap={0}>
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Examen 1</Text>
								<Divider orientation="vertical" />
								<Group justify="end" mr={"sm"}>
									<ActionIcon variant="white" c={"gray"}>
										<IconFile />
									</ActionIcon>
								</Group>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Examen 2</Text>
								<Divider orientation="vertical" />
								<Group justify="end" mr={"sm"}>
									<ActionIcon variant="white" c={"gray"}>
										<IconFile />
									</ActionIcon>
								</Group>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Examen 3</Text>
								<Divider orientation="vertical" />
								<Group justify="end" mr={"sm"}>
									<ActionIcon variant="white" c={"gray"}>
										<IconFile />
									</ActionIcon>
								</Group>
							</Group>
							<Divider />
						</Stack>
					</Group>
					<Divider />
					<Group mt={"md"}>
						<Title order={3}>Alergias</Title>
					</Group>
					<Divider />
					<Group grow>
						<Stack gap={0}>
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Alergia 1</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Alergia 2</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Alergia 3</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
						</Stack>
					</Group>
					<Group mt={"md"}>
						<Title order={3}>Medicamentos</Title>
					</Group>
					<Divider />
					<Group grow>
						<Stack gap={0}>
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 1</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 1</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
							<Group grow wrap="nowrap" justify="space-around">
								<Text>Medicamento 1sadsasda</Text>
								<Divider orientation="vertical" />
								<Text>Dosis</Text>
							</Group>
							<Divider />
						</Stack>
					</Group>
				</Card>
			</Container>
		</>
	);
}

export default ViewPatient;
