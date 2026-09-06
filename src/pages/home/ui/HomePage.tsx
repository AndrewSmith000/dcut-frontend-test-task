import { Stack } from "@mantine/core";

import { CreateSlide } from '@/features/create-slide'
import { SlidesCarousel } from '../../../widgets/slides-carousel'

export function HomePage() {
    return (
        <Stack align="center" gap="md" w="100%">
            <CreateSlide />
            <SlidesCarousel />
        </Stack>
    )
}