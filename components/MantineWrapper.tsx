import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css"
import React from "react";
import {createTheme, MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

const theme = createTheme({
  /** Your theme override here */
  fontFamily: "Inter, sans-serif",
});


function MantineWrapper({ children }: { children: React.ReactNode }) {
  return (
      <MantineProvider theme={theme}>
        <Notifications position={"top-right"}/>
        {children}
      </MantineProvider>
  )
}

export default MantineWrapper;