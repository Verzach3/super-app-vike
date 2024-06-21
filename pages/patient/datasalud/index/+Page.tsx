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
	ActionIcon,
	rem,
} from "@mantine/core";
import { IconEye, IconFileUpload } from "@tabler/icons-react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { onEnroll } from "./onEnroll.telefunc";
import { useRef, useState } from "react";
import { reload } from "vike/client/router";
import { Dropzone, type FileWithPath } from "@mantine/dropzone";
import { onFileUpload } from "./onFileUpload.telefunc";
import { notifications } from "@mantine/notifications";
import { IconX, IconUpload, IconPhoto } from "@tabler/icons-react";
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
						<ActionIcon variant="transparent" c={"gray"}>
							<IconEye />
						</ActionIcon>
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
				<Card bg={"gray.1"} h={"75dvh"} mt={"xl"} radius={"lg"} withBorder>
					{data.files?.length === 0 ? (
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
						<>
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
							<Dropzone.FullScreen
								active
								accept={[
									"application/pdf",
									"application/msword",
									"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								]}
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
							>
								<Group
									justify="center"
									gap="xl"
									mih={220}
									style={{ pointerEvents: "none" }}
								>
									<Dropzone.Accept>
										<IconUpload
											style={{
												width: rem(52),
												height: rem(52),
												color: "var(--mantine-color-blue-6)",
											}}
											stroke={1.5}
										/>
									</Dropzone.Accept>
									<Dropzone.Reject>
										<IconX
											style={{
												width: rem(52),
												height: rem(52),
												color: "var(--mantine-color-red-6)",
											}}
											stroke={1.5}
										/>
									</Dropzone.Reject>
									<Dropzone.Idle>
										<IconPhoto
											style={{
												width: rem(52),
												height: rem(52),
												color: "var(--mantine-color-dimmed)",
											}}
											stroke={1.5}
										/>
									</Dropzone.Idle>

									<div>
										<Text size="xl" inline>
											Drag images here or click to select files
										</Text>
										<Text size="sm" c="dimmed" inline mt={7}>
											Attach as many files as you like, each file should not
											exceed 5mb
										</Text>									</div>
								</Group>
							</Dropzone.FullScreen>
						</>
					)}
				</Card>
			</Group>
		</Container>
	);
}

export default DataSalud;
