import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useSessionStore } from "@/entities/session";

export function LogoutButton() {
    const logout = useSessionStore(state => state.logout);
    const { t } = useTranslation('logout');

    return (
        <Button variant="subtle" onClick={logout}>
            {t('logout')}
        </Button>
    )
}