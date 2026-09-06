import { Box, Group, Text } from '@mantine/core';

import { useSessionStore } from '@/entities/session';
import { LogoutButton } from "@/features/auth/logout";

export function Header() {
    const token = useSessionStore((state) => state.token);

    return (
        <Box
            component="header"
            h={60}
            style={{
                borderBottom: '1px solid var(--mantine-color-default-border)',
            }}
        >
            <Group
                h="100%"
                px="md"
                justify="space-between"
            >
                <Text fw={700}>DCUT TEST APP</Text>

                {token && <LogoutButton />}
            </Group>
        </Box>
    )
}