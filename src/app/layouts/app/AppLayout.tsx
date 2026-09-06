import { Box } from '@mantine/core'
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

export function AppLayout() {
    return (
        <>
            <Header />

            <Box
                component="main"
                px="md"
                py="xl"
                mih="calc(100vh - 60px)"
            >
                <Outlet />
            </Box>
        </>
    )
}