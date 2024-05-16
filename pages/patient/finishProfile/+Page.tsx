import React from "react";
import {Center, Container} from "@mantine/core";
import ProfileForm from "@/pages/patient/finishProfile/ProfileForm";

function Page() {
  return (
    <Container fluid mt={"1.5rem"} pb={"5rem"}>
      <Center>
        <ProfileForm/>
      </Center>
    </Container>
  )
}

export default Page;