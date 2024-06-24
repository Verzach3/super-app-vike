import { AppShell, Box, LoadingOverlay } from "@mantine/core";
import { useAtomValue } from "jotai";
import { DashboardTransitionAtom } from "@/state/dashboard/TransitionAtom";
import { DashNav } from "@/components/case-workers/DashNav";

export default function Dashboard({ children }: { children: React.ReactNode }) {
	const loading = useAtomValue(DashboardTransitionAtom);
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
				<LoadingOverlay
					visible={loading}
					zIndex={1000}
					loaderProps={{ type: "dots" }}
				/>
				{children}
			</AppShell.Main>
		</AppShell>
	);
}
