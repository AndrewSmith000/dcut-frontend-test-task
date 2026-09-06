import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

export function ProtectedLayout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    )
}