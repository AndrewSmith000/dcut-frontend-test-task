import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useSlideStore } from '../model/slideStore'
import type { Slide } from '../model/types'

interface SlideCardProps {
    slide: Slide;
}

export function SlideCard({ slide }: SlideCardProps) {
    const { t } = useTranslation('slide');
    const toggleChecked = useSlideStore((state) => state.toggleChecked)

    return (
        <Card withBorder>
            <Stack>
                <Title order={3}>{slide.title}</Title>

                <Text>{slide.annotation}</Text>

                <Badge>
                    {slide.isChecked ? t('checked') : t('unchecked')}
                </Badge>

                <Button
                    variant="light"
                    onClick={() => toggleChecked(slide.id)}
                >
                    {slide.isChecked ? t('markUnchecked') : t('markChecked')}
                </Button>
            </Stack>
        </Card>
    )
}