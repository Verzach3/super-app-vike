import { sleep } from "@/libs/sleep";
import { ActionIcon, Button, Card, Collapse, Container, Group, Loader, Stack, Stepper, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconPlayerPlay } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

function Integrations() {
  const [opened, { toggle }] = useDisclosure(false);
  const [openedArticles, { toggle: toggleArticles }] = useDisclosure(false);
  const [loading, { close: closeLoading, open: openLoading }] = useDisclosure(false);
  const [loadingArticles, { close: closeLoadingArticles, open: openLoadingArticles }] = useDisclosure(false);
  const [blogsRunning, { toggle: toggleBlogsRunnig }] = useDisclosure(false);
  const [active, setActive] = useState(1);
  const [activeArticles, setActiveArticles] = useState(1);
  const [blogResults, setBlogResults] = useState({ duplicates: 0, updated: 0 });
  const [articleResults, setArticleResults] = useState({ duplicates: 0, updated: 0 });
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const nextStepArticles = () => setActiveArticles((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const prevStepArticles = () => setActiveArticles((current) => (current > 0 ? current - 1 : current));

  async function updateBlogs() {
    setActive(1);
    openLoading();
    await sleep(2000);
    nextStep();
    await sleep(2000);
    nextStep();
    const res = await axios.get("https://n8n.containers.wellfitclinic.com/webhook/9870ed7d-44b4-4efe-90c9-b21e8c040b20")
    console.log(res.data, active)
    nextStep();
    nextStep();
    setBlogResults({ duplicates: res.data.same ?? 0, updated: res.data.updated ?? 0 });
    closeLoading();
  }

  async function updateArticles() {
    setActiveArticles(1);
    openLoadingArticles();
    await sleep(2000);
    nextStepArticles();
    await sleep(2000);
    nextStepArticles();
    const res = await axios.get("https://n8n.containers.wellfitclinic.com/webhook/b6166b6c-27f4-43d4-9723-745900cae429")
    console.log(res.data, active)
    nextStepArticles();
    nextStepArticles();
    setArticleResults({ duplicates: res.data.same ?? 0, updated: res.data.updated ?? 0 });
    closeLoadingArticles();
  }

  return (
    <Container mt={"lg"}>
      <Stack>
        <Card withBorder>
          <Group grow justify="space-between" onClick={toggle}>
            <Text>
              Integracion de Blogs
            </Text>
            <Group justify="right">
              <ThemeIcon size={"lg"} variant="white" c={"black"}>
                <IconChevronDown />
              </ThemeIcon>
            </Group>
          </Group>
          <Collapse in={opened}>
            <Stepper active={active} mt={"2rem"}>
              <Stepper.Step label="Empezar Integracion" description="Obtener Blogs de Notion" loading={active === 1 && loading}>
                {loading && <Loader type="dots" />}
              </Stepper.Step>
              <Stepper.Step label="Detectar Duplicados" description="Omitir duplicados sin cambios" loading={active === 2 && loading}>
                {loading && <Loader type="dots" />}

              </Stepper.Step>
              <Stepper.Step label="Subir a la Base de Datos" description="Actualizar en Supabase" loading={active === 3 && loading}>
                {loading && <Loader type="dots" />}

              </Stepper.Step>
              <Stepper.Completed>
                {loading ? <Loader type="dots" /> :
                  <>
                    <Text ff={"Inter"} fw={600}>
                      Duplicados: <Text span>{blogResults.duplicates}</Text>
                    </Text>
                    <Text ff={"Inter"} fw={600}>
                      Actualizados: <Text span>{blogResults.updated}</Text>
                    </Text>
                  </>
                }
              </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
              <Button onClick={updateBlogs} disabled={loading}>
                Iniciar Integracion
              </Button>
            </Group>
          </Collapse>
        </Card>
        <Card withBorder>
          <Group grow justify="space-between" onClick={toggleArticles}>
            <Text>
              Integracion de Articulos
            </Text>
            <Group justify="right">
              <ThemeIcon size={"lg"} variant="white" c={"black"}>
                <IconChevronDown />
              </ThemeIcon>
            </Group>
          </Group>
          <Collapse in={openedArticles}>
            <Stepper active={activeArticles} mt={"2rem"}>
              <Stepper.Step label="Empezar Integracion" description="Obtener articulos de Notion" loading={activeArticles === 1 && loadingArticles}>
                {loadingArticles && <Loader type="dots" />}
              </Stepper.Step>
              <Stepper.Step label="Detectar Duplicados" description="Omitir duplicados sin cambios" loading={activeArticles === 2 && loadingArticles}>
                {loadingArticles && <Loader type="dots" />}

              </Stepper.Step>
              <Stepper.Step label="Subir a la Base de Datos" description="Actualizar en Supabase" loading={activeArticles === 3 && loadingArticles}>
                {loadingArticles && <Loader type="dots" />}

              </Stepper.Step>
              <Stepper.Completed>
                {loadingArticles ? <Loader type="dots" /> :
                  <>
                    <Text ff={"Inter"} fw={600}>
                      Duplicados: <Text span>{articleResults.duplicates}</Text>
                    </Text>
                    <Text ff={"Inter"} fw={600}>
                      Actualizados: <Text span>{articleResults.updated}</Text>
                    </Text>
                  </>
                }
              </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
              <Button onClick={updateArticles} disabled={loadingArticles}>
                Iniciar Integracion
              </Button>
            </Group>
          </Collapse>
        </Card>

      </Stack>
    </Container>
  )
}

export default Integrations;