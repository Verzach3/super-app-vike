import { Title, Text, ActionIcon, Modal, ThemeIcon, Paper, SimpleGrid, Center, Group, Button } from "@mantine/core";
import { IconX, IconUserPlus, IconHistory, IconUpload, IconQuestionMark, IconCalendar, IconBrandWhatsapp } from "@tabler/icons-react";
import classes from "@/styles/login/BannerInstruction.module.css";
import { useState } from "react";

export default function BannerInstruction() {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  // Codificación de emojis para el mensaje de WhatsApp
  const whatsappMessage = "¡Hola! Quiero más información sobre cómo navegar en la plataforma o necesito una asesoría. %F0%9F%98%8A%F0%9F%93%9E";

  return (
     <Modal
      opened={showModal}
      onClose={handleClose}
      size="auto"
      centered
      classNames={{
        header: classes.modalHeader,
        body: classes.modalBody,
      }}
    >
      <Paper className={classes.banner} shadow="md" p="xl" radius="md" withBorder>
        <div className={classes.bannerHeader}>
          <Title order={1} className={classes.bannerTitle}>
            Bienvenido a nuestro nuevo portal del paciente
          </Title>
          <ActionIcon className={classes.closeButton} onClick={handleClose} color="gray.1" size={"xl"}>
            <IconX className={classes.iconX} />
          </ActionIcon>
        </div>
        <Text size="lg" className={classes.bannerText}>
          Descubre nuestro nuevo portal del paciente, diseñado para brindarte una experiencia de salud más accesible y personalizada.
        </Text>
        <SimpleGrid className={classes.grid}>

          <Paper shadow="md" p="xl" radius="md" withBorder className={classes.card}>
            <Center>
              <ThemeIcon color="blue" size="xl" radius="xl" variant="light" className={classes.cardIcon}>
                <IconUserPlus size={28} />
              </ThemeIcon>
            </Center>
            <Title order={3} ta="center" mt="md" className={classes.cardTitle}>
              Regístrate
            </Title>
            <Text size="sm" color="dimmed" ta="center" mt="xs" className={classes.cardText}>
              Inicia tu viaje con DataSalud registrándote en nuestro portal y gestiona tu historial médico de manera segura.
            </Text>
          </Paper>

          <Paper shadow="md" p="xl" radius="md" withBorder className={classes.card}>
            <Center>
              <ThemeIcon color="green" size="xl" radius="xl" variant="light" className={classes.cardIcon}>
                <IconHistory size={28} />
              </ThemeIcon>
            </Center>
            <Title order={3} ta="center" mt="md" className={classes.cardTitle}>
              Comparte
            </Title>
            <Text size="sm" color="dimmed" ta="center" mt="xs" className={classes.cardText}>
              Mantén tu información médica en un solo lugar y compártela fácilmente.
            </Text>
          </Paper>
          <Paper shadow="md" p="xl" radius="md" withBorder className={classes.card}>
            <Center>
              <ThemeIcon color="orange" size="xl" radius="xl" variant="light" className={classes.cardIcon}>
                <IconUpload size={28} />
              </ThemeIcon>
            </Center>
            <Title order={3} ta="center" mt="md" className={classes.cardTitle}>
              Analiza
            </Title>
            <Text size="sm" color="dimmed" ta="center" mt="xs" className={classes.cardText}>
              Utiliza nuestro servicio DataSalud para subir tus datos médicos y recibir análisis detallados.
            </Text>
          </Paper>
          <Paper shadow="md" p="xl" radius="md" withBorder className={classes.card}>
            <Center>
              <ThemeIcon color="violet" size="xl" radius="xl" variant="light" className={classes.cardIcon}>
                <IconQuestionMark size={28} />
              </ThemeIcon>
            </Center>
            <Title order={3} ta="center" mt="md" className={classes.cardTitle}>
              Cuestionarios
            </Title>
            <Text size="sm" color="dimmed" ta="center" mt="xs" className={classes.cardText}>
              Completa cuestionarios personalizados y accede a recursos de aprendizaje.
            </Text>
          </Paper>
          <Paper shadow="md" p="xl" radius="md" withBorder className={classes.card}>
            <Center>
              <ThemeIcon color="red" size="xl" radius="xl" variant="light" className={classes.cardIcon}>
                <IconCalendar size={28} />
              </ThemeIcon>
            </Center>
            <Title order={3} ta="center" mt="md" className={classes.cardTitle}>
              Agenda
            </Title>
            <Text size="sm" color="dimmed" ta="center" mt="xs" className={classes.cardText}>
              Consulta y agenda tus citas médicas de manera rápida y sencilla desde nuestro portal.
            </Text>
          </Paper>
        </SimpleGrid>
        <div className={classes.contactSection}>
          <Text size="lg" className={classes.contactText}>
            ¿Tienes dudas de cómo navegar en el portal? Contáctanos:
          </Text>
          <Button
            component="a"
            href={`https://wa.me/573107686345?text=${whatsappMessage}`}
            target="_blank"
            className={classes.whatsappButton}
          >
            Contactar por WhatsApp
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
