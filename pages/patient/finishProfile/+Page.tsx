import React from "react";
import {Center, Container} from "@mantine/core";
import ProfileForm from "@/pages/patient/finishProfile/ProfileForm";

function Page() {
  return (
    <Container fluid mt={"2rem"} pb={"5rem"}>
      <Center>
        <ProfileForm/>
      </Center>
    </Container>
  )
}

export default Page;