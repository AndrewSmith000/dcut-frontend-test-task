import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

interface DeleteSlideProps {
    onConfirm: () => void
}

export function DeleteSlide({ onConfirm }: DeleteSlideProps) {
    const [opened, {open, close}] = useDisclosure(false);

    const { t } = useTranslation('deleteSlide');

    const handleDelete = () => {
        close()
        onConfirm()
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