import { useData } from "vike-react/useData";
import type { CaseWorkerData } from "./+data";
import {
	Affix,
	Badge,
	Button,
	Card,
	Center,
	Container,
	Drawer,
	Group,
	LoadingOverlay,
	Select,
	Table,
	ThemeIcon,
	Title,
} from "@mantine/core";
import type { FileStat } from "webdav";
import { Car, Eye, Trash } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { onViewFile } from "./onViewFile.telefunc";
import { IconAi, IconBrain, IconInputAi } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import IAReportGenerator from "./IAReportGenerator";

function ViewCase() {
	const [isLoading, setIsLoading] = useState(false);
	const [IAReportsOpened, { open: openIAReports, close: closeIAReports }] =
		useDisclosure(false);
	const data = useData<CaseWorkerData>();
	return (
		<>
			<Container>
				<Title mt={"md"}>
					Paciente: {data.caseData?.patient?.name}{" "}
					{data.caseData?.patient?.lastname}
				</Title>
				<Title order={3} mt={"3rem"} mb={"md"}>
					Archivos
				</Title>
				<Card withBorder h={"80dvh"}>
					<Table.ScrollContainer minWidth={"100%"}>
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Nombre</Table.Th>
									<Table.Th>Fecha de Subida</Table.Th>
									<Table.Th>Estado</Table.Th>
									<Table.Th>Acciones</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{((data.files as FileStat[]) ?? []).map((file) => (
									<Table.Tr key={file.etag}>
										<Table.Td>{file.basename}</Table.Td>
										<Table.Td>{file.lastmod}</Table.Td>
										<Table.Td>
											<Select
												w={"70%"}
												data={[
													{
														value: "processing",
														label: "En proceso",
													},
													{
														value: "completed",
														label: "Completado",
													},
													{
														value: "pending",
														label: "Pendiente",
													},
												]}
												defaultValue="processing"
											/>
										</Table.Td>
										<Table.Td>
											<Center
												style={{
													justifyContent: "space-between",
												}}
											>
												<ThemeIcon
													variant="transparent"
													c={"gray"}
													onClick={async () => {
														setIsLoading(true);
														const res = await onViewFile(file.filename);
														// convert file from base64 and download as a file
														const byteCharacters = atob(res);
														const byteNumbers = new Array(
															byteCharacters.length,
														);
														for (let i = 0; i < byteCharacters.length; i++) {
															byteNumbers[i] = byteCharacters.charCodeAt(i);
														}
														const byteArray = new Uint8Array(byteNumbers);

														// Crear Blob
														const blob = new Blob([byteArray]);

														// Crear URL del objeto y link de descarga
														const url = URL.createObjectURL(blob);
														const link = document.createElement("a");
														link.href = url;
														link.download = file.basename;

														// Simular click para descargar
														document.body.appendChild(link);
														link.click();
														document.body.removeChild(link);

														// Liberar el objeto URL
														URL.revokeObjectURL(url);
														setIsLoading(false);
													}}
												>
													<Eye />
												</ThemeIcon>
												<ThemeIcon
													variant="transparent"
													c={"red"}
													onClick={() => {
														notifications.show({
															title: "Funcionalidad no implementada",
															message:
																"Esta funcionalidad no ha sido implementada aún",
															color: "red",
														});
													}}
												>
													<Trash />
												</ThemeIcon>
											</Center>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</Table.ScrollContainer>
				</Card>
			</Container>
			<Drawer opened={IAReportsOpened} onClose={closeIAReports} position="right" zIndex={1000}>
				<IAReportGenerator />
			</Drawer>
			<LoadingOverlay visible={isLoading} />
			<Affix
				position={{
					bottom: 20,	
					right: 30,
				}}
			>
				<Button leftSection={<IconBrain />} onClick={openIAReports}>Generar reporte con IA</Button>
			</Affix>
		</>
	);
}

export default ViewCase;
