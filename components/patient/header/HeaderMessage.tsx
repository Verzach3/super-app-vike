import {
	ActionIcon,
	Card,
	Center,
	Stack,
	Text,
	ThemeIcon,
	Group,
} from "@mantine/core";
import { IconChevronRight, IconMessageCircle } from "@tabler/icons-react";
import { MessageCircleMore, MessageSquareMore } from "lucide-react";

interface HeaderMessageProps {
	title: string;
	content: string;
}

function HeaderMessage({ title, content }: HeaderMessageProps) {
	return (
		<Card p={0} withBorder radius={0}>
			<Group grow py={"xs"} justify="space-between">
				<Group ml={"md"} grow>
					<ThemeIcon variant="transparent">
						<MessageSquareMore />
					</ThemeIcon>
					<Stack gap={0} w={"100%"}>
						<Text fw={700}>{title}</Text>
						<Text size="sm" c="dimmed" lineClamp={1}>
							{content}
						</Text>
					</Stack>
				</Group>
				<Group justify="end">
				<ThemeIcon variant="transparent" color="gray" mr={"sm"}>
					<IconChevronRight />
				</ThemeIcon>
				</Group>
			</Group>
		</Card>
	);
}

export default HeaderMessage;
