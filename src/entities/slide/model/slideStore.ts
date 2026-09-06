import { create } from 'zustand'
import { persist } from "zustand/middleware";

import type { Slide } from "./types";

interface CreateSlideData {
    title: string;
    annotation: string;
}

interface SlideState {
    slides: Slide[];
    addSlide: (data: CreateSlideData) => void;
    removeSlide: (id: string) => void;
    toggleChecked: (id: string) => void;
}

const createInitialSlides = (): Slide[] => [
    {
        id: crypto.randomUUID(),
        title: 'Первый слайд',
        annotation: 'Описание первого слайда',
        isChecked: false,
    },
    {
        id: crypto.randomUUID(),
        title: 'Второй слайд',
        annotation: 'Описание второго слайда',
        isChecked: true,
    },
    {
        id: crypto.randomUUID(),
        title: 'Третий слайд',
        annotation: 'Описание третьего слайда',
        isChecked: false,
    },
    {
        id: crypto.randomUUID(),
        title: 'Четвёртый слайд',
        annotation: 'Описание четвёртого слайда',
        isChecked: false,
    },
]

export const useSlideStore = create<SlideState>()(
    persist(
        (set) => ({
            slides: createInitialSlides(),

            addSlide: (data) =>
                set((state) => ({
                    slides: [
                        ...state.slides,
                        {
                            id: crypto.randomUUID(),
                            ...data,
                            isChecked: false
                        },
                    ],
                })),

            removeSlide: (id) =>
                set((state) => ({
                    slides: state.slides.filter((slide) => slide.id !== id)
                })),

            toggleChecked: (id) =>
                set((state) => ({
                    slides: state.slides.map((slide) =>
                        slide.id === id
                            ? { ...slide, isChecked: !slide.isChecked }
                            : slide,
                    )
                }))
        }),
        {
            name: 'slides',
        }
    )
)