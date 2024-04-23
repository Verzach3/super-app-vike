import "@mantine/core/styles.css"
import React from "react";
import {createTheme, MantineProvider} from "@mantine/core";

const theme = createTheme({
  /** Your theme override here */
  fontFamily: "Inter, sans-serif",
});


function MantineWrapper({ children }: { children: React.ReactNode }) {
  return (
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
  )
}

export default MantineWrapper;