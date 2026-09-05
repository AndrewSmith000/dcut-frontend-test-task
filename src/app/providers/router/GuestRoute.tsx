import { Navigate, Outlet } from 'react-router-dom'
import { useSessionStore } from '@/entities/session'

export function GuestRoute() {
    const token = useSessionStore((state) => state.token)

    if (token) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}