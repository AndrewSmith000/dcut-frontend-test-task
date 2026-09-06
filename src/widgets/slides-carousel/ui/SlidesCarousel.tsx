import { ActionIcon, Group, Stack } from "@mantine/core";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DeleteSlide } from '@/features/delete-slide'
import {SlideCard, useSlideStore} from "@/entities/slide";

import styles from '../slides-carousel.module.css'

export function SlidesCarousel() {
    const slides = useSlideStore((state) => state.slides);
    const { t } = useTranslation('slidesCarousel')

    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel();

    const scrollPrev = () => {
        emblaApi?.scrollPrev()
    }

    const scrollNext = () => {
        emblaApi?.scrollNext()
    }

    const onSelect = useCallback(() => {
        if (!emblaApi) {
            return
        }

        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        emblaApi.on('select', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <Stack>
            <div className={styles.viewport} ref={emblaRef}>
                <div className={styles.container}>
                    {slides.map((slide) => (
                        <div className={styles.slide} key={slide.id}>
                            <SlideCard slide={slide} />
                            <DeleteSlide slideId={slide.id} />
                        </div>
                    ))}
                </div>
            </div>

            <Group justify="center">
                <ActionIcon
                    variant="default"
                    onClick={scrollPrev}
                    aria-label={t('previous')}
                >
                    -
                </ActionIcon>

                <Group gap="xs">
                    {slides.map((slide, index) => (
                        <ActionIcon
                            key={slide.id}
                            variant={index === selectedIndex ? 'filled' : 'default'}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={t('goToSlide', { number: index + 1 })}
                        >
                            {index + 1}
                        </ActionIcon>
                    ))}
                </Group>

                <ActionIcon
                    variant="default"
                    onClick={scrollNext}
                >
                    +
                </ActionIcon>
            </Group>
        </Stack>
    )
}