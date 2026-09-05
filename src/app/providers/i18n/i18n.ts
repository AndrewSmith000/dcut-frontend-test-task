import i18n from 'i18next'
import { initReactI18next } from "react-i18next";

import loginRu from '@/features/auth/login/locales/ru.json'
import loginEn from '@/features/auth/login/locales/en.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',

        resources: {
            ru: {
                login: loginRu,
            },
            en: {
                login: loginEn,
            },
        },

        interpolation: {
            escapeValue: false,
        },
    })

export default i18n;