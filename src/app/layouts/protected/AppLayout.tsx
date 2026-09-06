import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

export function AppLayout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    )
}