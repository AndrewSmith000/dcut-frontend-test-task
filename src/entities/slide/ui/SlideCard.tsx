import type { ReactNode } from 'react'

import { Box, Card, Group, Stack, Switch, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import type { Slide } from '../model/types'

interface SlideCardProps {
    slide: Slide;
    onToggleChecked: (id: string) => void;
    actions?: ReactNode;
}

export function SlideCard({ slide, onToggleChecked, actions }: SlideCardProps) {
    const { t } = useTranslation('slide');

    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            h={260}
        >
            <Stack h="100%"
            >
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Title
                        order={2}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            overflowWrap: 'anywhere',
                        }}
                    >{slide.title}</Title>

                    <Box style={{ flexShrink: 0 }}>
                        {actions}
                    </Box>
                </Group>

                <Text c="dimmed" size="md" lh={1.6}>{slide.annotation}</Text>

                <Group justify="flex-end" gap="xs" wrap="nowrap" mt="auto">
                    <Switch
                        size="md"
                        checked={slide.isChecked}
                        onChange={() => onToggleChecked(slide.id)}
                    />

                    <Box w={80} ta="right">
                        <Text size="md">
                            {slide.isChecked
                                ? t('selected')
                                : t('unselected')}
                        </Text>
                    </Box>
                </Group>
            </Stack>
        </Card>
    )
}