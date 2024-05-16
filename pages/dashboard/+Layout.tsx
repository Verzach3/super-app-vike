import { AppShell, Box, LoadingOverlay } from "@mantine/core";
import { DashNav } from "@/components/dashboard/DashNav";
import { useAtomValue } from "jotai";
import { TransitionAtom } from "@/state/dashboard/TransitionAtom";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const loading = useAtomValue(TransitionAtom)
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <DashNav />
      </AppShell.Navbar>
      <AppShell.Main>
          <LoadingOverlay visible={loading} zIndex={1000} loaderProps={{ type: "dots"}} />
          {children}
      </AppShell.Main>
    </AppShell>
  );
}
