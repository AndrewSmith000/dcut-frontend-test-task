import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {SlideCard, useSlideStore} from "@/entities/slide";
import { DeleteSlide } from '@/features/delete-slide'

import styles from '../slides-carousel.module.css'

export function SlidesCarousel() {
    const { t } = useTranslation('slidesCarousel')

    const slides = useSlideStore((state) => state.slides);
    const toggleChecked = useSlideStore((state) => state.toggleChecked,)

    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel();

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        const handleSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        const handleReInit = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        emblaApi.on('select', handleSelect)
        emblaApi.on('reInit', handleReInit)

        return () => {
            emblaApi.off('select', handleSelect)
            emblaApi.off('reInit', handleReInit)
        }
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        emblaApi.reInit()
    }, [emblaApi, slides.length])

    const scrollPrev = () => {
        emblaApi?.scrollPrev()
    }

    const scrollNext = () => {
        emblaApi?.scrollNext()
    }

    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index)
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
                                            <DeleteSlide
                                                slideId={slide.id}
                                            />
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