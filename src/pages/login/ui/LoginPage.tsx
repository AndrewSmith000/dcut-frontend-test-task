import { Center, Paper, Stack, Title } from '@mantine/core'

import { useTranslation } from "react-i18next";
import { LoginForm } from '@/features/auth/login'

export function LoginPage() {
    const { t } = useTranslation('login')

    return (
        <Center mih="calc(100vh - 60px - 48px)">
            <Paper
                withBorder
                shadow="sm"
                radius="md"
                p="xl"
                w="100%"
                maw={420}
            >
                <Stack>
                    <Title order={2} ta="center">
                        {t('title')}
                    </Title>

                    <LoginForm />
                </Stack>
            </Paper>
        </Center>
    )
}