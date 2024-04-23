import React from "react";
import {Button, Center, Container, Image, Stack, Text, TextInput, Title} from "@mantine/core";

function Page() {
  return (
    <Container fluid mt={"2rem"}>
      <Center>
        <Stack>
          <Center>
            <Image src={"/assets/wellfit-bottom-text.svg"} h={230} w={"auto"}/>
          </Center>
          <Title ta={"center"}>Terminemos tu perfil</Title>
          <Text ta={"center"} fw={600} c={"gray"}>
            Para poder brindarte un mejor servicio, necesitamos conocer mas de ti.
          </Text>
          <TextInput label={"Nombre"} required mt={"2rem"}/>
          <TextInput label={"Segundo Nombre (Opcional)"}/>
          <TextInput label={"Apellido"} required/>
          <TextInput label={"Segundo Apellido (Opcional)"}/>
          <Button>
            Continuar
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default Page;