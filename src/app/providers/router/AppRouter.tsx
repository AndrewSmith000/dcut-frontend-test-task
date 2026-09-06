import { HashRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { AppLayout } from "../../layouts/app";
import { GuestRoute } from "./GuestRoute.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    )
}
