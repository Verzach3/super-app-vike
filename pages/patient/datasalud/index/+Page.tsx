import {
	Button,
	Card,
	Center,
	Container,
	Group,
	Title,
	Text,
	Stack,
	LoadingOverlay,
	Table,
	Badge,
} from "@mantine/core";
import { IconFileUpload } from "@tabler/icons-react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { onEnroll } from "./onEnroll.telefunc";
import { useRef, useState } from "react";
import { reload } from "vike/client/router";
import { Dropzone, type FileWithPath } from "@mantine/dropzone";
import { onFileUpload } from "./onFileUpload.telefunc";
import { notifications } from "@mantine/notifications";

function DataSalud() {
	const data = useData<Data>();
	const openRef = useRef<() => void>(null);
	const [loading, setLoading] = useState(false);
	if (data.error) {
		return (
			<Container mt={"md"}>
				<Title ta={"center"}>Tu DataSalud</Title>
				<Center mt={"10rem"}>
					<Button
						loading={loading}
						onClick={async () => {
							setLoading(true);
							await onEnroll();
							setLoading(false);
							await reload();
						}}
						size="xl"
						radius={"xl"}
						variant="gradient"
						gradient={{ from: "teal", to: "lime", deg: 90 }}
					>
						Unete a Datasalud
					</Button>
				</Center>
			</Container>
		);
	}

	const rows = data.files?.map((file) => {
		return (
			<Table.Tr key={file.basename}>
				<Table.Td>{file.basename}</Table.Td>
				<Table.Td>
					<Badge color="orange">En Proceso</Badge>
				</Table.Td>
				<Table.Td>
					<Group justify="end">
						<Button onClick={() => {}}>Eliminar</Button>
						<Button onClick={() => {}}>Ver</Button>
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});
	return (
		<Container mt={"md"}>
			<LoadingOverlay
				visible={loading}
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
			<Title ta={"center"}>Tu DataSalud</Title>
			<Group grow>
				<Card bg={"#edede9"} h={"75dvh"} mt={"xl"} radius={"lg"}>
					{!data.files ? (
						<Center h={"100%"}>
							<Stack>
								<Text fw={600}>
									No tienes archivos en Datasalud, agrega .pdf o .docx
								</Text>
								<Dropzone
									accept={{
										"application/pdf": [".pdf"],
										"application/msword": [".docx"],
									}}
									bg={"#edede9"}
									openRef={openRef}
									onDrop={async (files) => {
										setLoading(true);
										for (const file of files) {
											//convert to base64
											const reader = new FileReader();
											reader.readAsDataURL(file);
											reader.onload = async (e) => {
												const base64 = reader.result as string;
												await onFileUpload(base64, file.name);
												notifications.show({
													title: `Archivo ${file.name} cargado correctamente`,
													message: "El archivo ha sido cargado correctamente",
												});
											};
											setLoading(false);
											reload();
										}
									}}
									activateOnClick={false}
								>
									<Group justify="center">
										<Button
											onClick={() => openRef.current?.()}
											style={{ pointerEvents: "all" }}
											rightSection={<IconFileUpload />}
										>
											Agregar Archivos
										</Button>
									</Group>
								</Dropzone>
							</Stack>
						</Center>
					) : (
						<Table.ScrollContainer minWidth={"100%"}>
							<Table>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Nombre de Archivo</Table.Th>
										<Table.Th>Estado</Table.Th>
										<Table.Th ta={"end"}>Acciones</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{rows}</Table.Tbody>
							</Table>
						</Table.ScrollContainer>
					)}
				</Card>
			</Group>
		</Container>
	);
}

export default DataSalud;
