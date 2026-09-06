import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

import { useSlideStore } from '@/entities/slide';

interface DeleteSlideProps {
    slideId: string
}

export function DeleteSlide({slideId}: DeleteSlideProps) {
    const [opened, {open, close}] = useDisclosure(false);

    const removeSlide= useSlideStore(state => state.removeSlide);

    const { t } = useTranslation('deleteSlide');

    const handleDelete = () => {
        removeSlide(slideId);
        close();
    }

    return (
        <>
            <Button
                variant="light"
                color="red"
                onClick={open}
            >
                {t('delete')}
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                title={t('confirmTitle')}
                centered
            >
                <Text>{t('confirmMessage')}</Text>

                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={close}>
                        {t('cancel')}
                    </Button>

                    <Button color="red" onClick={handleDelete}>
                        {t('confirm')}
                    </Button>
                </Group>
            </Modal>
        </>
    )
}