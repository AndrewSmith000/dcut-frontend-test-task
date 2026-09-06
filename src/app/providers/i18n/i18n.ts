import i18n from 'i18next'
import { initReactI18next } from "react-i18next";

import loginRu from '@/features/auth/login/locales/ru.json'
import loginEn from '@/features/auth/login/locales/en.json'
import slideRu from '@/entities/slide/locales/ru.json'
import slideEn from '@/entities/slide/locales/en.json'
import slidesCarouselRu from '@/widgets/slides-carousel/locales/ru.json'
import slidesCarouselEn from '@/widgets/slides-carousel/locales/en.json'
import createSlideRu from '@/features/create-slide/locales/ru.json'
import createSlideEn from '@/features/create-slide/locales/en.json'
import deleteSlideRu from '@/features/delete-slide/locales/ru.json'
import deleteSlideEn from '@/features/delete-slide/locales/en.json'
import logoutRu from '@/features/auth/logout/locales/ru.json'
import logoutEn from '@/features/auth/logout/locales/en.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',

        resources: {
            ru: {
                login: loginRu,
                slide: slideRu,
                slidesCarousel: slidesCarouselRu,
                createSlide: createSlideRu,
                deleteSlide: deleteSlideRu,
                logout: logoutRu,
            },
            en: {
                login: loginEn,
                slide: slideEn,
                slidesCarousel: slidesCarouselEn,
                createSlide: createSlideEn,
                deleteSlide: deleteSlideEn,
                logout: logoutEn,
            },
        },

        interpolation: {
            escapeValue: false,
        },
    })

export default i18n;