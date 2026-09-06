import { CreateSlide } from '@/features/create-slide'
import { SlidesCarousel } from '../../../widgets/slides-carousel'

export function HomePage() {
    return (
        <>
            <CreateSlide />
            <SlidesCarousel />
        </>
    )
}