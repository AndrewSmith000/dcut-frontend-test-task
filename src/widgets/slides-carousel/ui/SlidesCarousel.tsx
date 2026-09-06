import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { SlideCard, useSlideStore } from "@/entities/slide";
import { DeleteSlide } from '@/features/delete-slide'
import { CopySlideUrl } from "@/features/copy-slide-url";

import styles from '../slides-carousel.module.css'

export function SlidesCarousel() {
    const { t } = useTranslation('slidesCarousel')

    const [searchParams, setSearchParams] = useSearchParams()
    const slides = useSlideStore((state) => state.slides);
    const slideId = searchParams.get('slide')

    const initialIndex = Math.max(
        slides.findIndex((slide) => slide.id === slideId),
        0,
    )

    const [selectedIndex, setSelectedIndex] = useState(initialIndex)

    const toggleChecked = useSlideStore((state) => state.toggleChecked,)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: initialIndex,
    });

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        const handleSelect = () => {
            const index = emblaApi.selectedScrollSnap()

            setSelectedIndex(index)

            const slide = slides[index]

            if (!slide) return

            setSearchParams(
                (params) => {
                    params.set('slide', slide.id)
                    return params
                },
                { replace: true },
            )
        }

        emblaApi.on('select', handleSelect)

        return () => {
            emblaApi.off('select', handleSelect)
        }
    }, [emblaApi, slides, setSearchParams])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        emblaApi.reInit()
    }, [emblaApi, slides.length])

    useEffect(() => {
        if (!emblaApi || !slideId) return

        const index = slides.findIndex(
            (slide) => slide.id === slideId,
        )

        if (index === -1) return

        if (emblaApi.selectedScrollSnap() === index) return

        emblaApi.scrollTo(index, true)
    }, [emblaApi, slideId, slides])

    const scrollPrev = () => {
        emblaApi?.scrollPrev()
    }

    const scrollNext = () => {
        emblaApi?.scrollNext()
    }

    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index)
    }

    const removeSlide = useSlideStore((state) => state.removeSlide)

    const handleSlideDeleted = (slideId: string) => {
        const deletedIndex = slides.findIndex(
            (slide) => slide.id === slideId,
        )

        if (deletedIndex === -1) return

        const remainingSlides = slides.filter(
            (slide) => slide.id !== slideId,
        )

        if (remainingSlides.length === 0) {
            setSelectedIndex(0)
            setSearchParams({}, { replace: true })
            removeSlide(slideId)
            return
        }

        const nextIndex = Math.min(
            deletedIndex,
            remainingSlides.length - 1,
        )

        const nextSlide = remainingSlides[nextIndex]

        setSelectedIndex(nextIndex)

        setSearchParams(
            { slide: nextSlide.id },
            { replace: true },
        )

        removeSlide(slideId)
    }

    return (
        <Stack align="center" w="100%">
            {slides.length === 0 ? (
                <Text c="dimmed">
                    {t('empty')}
                </Text>
            ) : (
                <Box
                    w={{ base: '92%', sm: '70%', md: '50%', lg: '38%' }}
                    maw={500}
                >
                    <div className={styles.viewport} ref={emblaRef}>
                        <div className={styles.container}>
                            {slides.map((slide) => (
                                <div className={styles.slide} key={slide.id}>
                                    <SlideCard
                                        slide={slide}
                                        onToggleChecked={toggleChecked}
                                        actions={
                                            <Group gap="xs">
                                                <CopySlideUrl slideId={slide.id} />

                                                <DeleteSlide
                                                    onConfirm={() => handleSlideDeleted(slide.id)}
                                                />
                                            </Group>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            )}


            {slides.length > 0 && (
                <Group gap="xs">
                    <ActionIcon
                        variant="default"
                        onClick={scrollPrev}
                        disabled={selectedIndex === 0}
                        aria-label={t('previousSlide')}
                    >
                        <IconChevronLeft size={18} />
                    </ActionIcon>

                    {slides.map((slide, index) => (
                        <ActionIcon
                            key={slide.id}
                            variant={
                                index === selectedIndex
                                    ? 'filled'
                                    : 'default'
                            }
                            onClick={() => scrollTo(index)}
                            aria-label={t('slideNumber', {
                                number: index + 1,
                            })}
                        >
                            {index + 1}
                        </ActionIcon>
                    ))}

                    <ActionIcon
                        variant="default"
                        onClick={scrollNext}
                        disabled={selectedIndex === slides.length - 1}
                        aria-label={t('nextSlide')}
                    >
                        <IconChevronRight size={18} />
                    </ActionIcon>
                </Group>
            )}
        </Stack>
    )
}