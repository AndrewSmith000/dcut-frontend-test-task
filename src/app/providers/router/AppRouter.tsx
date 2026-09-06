import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { AppLayout } from "@/app/layouts/protected";
import { GuestRoute } from "./GuestRoute.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export function AppRouter() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}
