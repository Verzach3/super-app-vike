import { AppShell, LoadingOverlay } from "@mantine/core";
import { DashNav } from "@/components/dashboard/DashNav";

export default function Dashboard({ children }: { children: React.ReactNode }) {
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
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
