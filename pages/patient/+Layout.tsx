import {AppShell, rem} from "@mantine/core";
import {Header} from "@/components/patient/Header";
import {useDisclosure} from "@mantine/hooks";
import React from "react";
import NavBar from "@/components/patient/NavBar";

function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: rem("60px") }}
      navbar={{
        width: rem("300px"),
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header zIndex={1001}>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar/>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout;