import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

import { useSlideStore } from "@/entities/slide";

interface CreateSlideFormValues {
    title: string;
    annotation: string;
}

export function CreateSlide() {
    const [opened, {open, close}] = useDisclosure(false);

    const addSlide = useSlideStore(state => state.addSlide);

    const { t } = useTranslation('createSlide');

    const form = useForm<CreateSlideFormValues>({
        initialValues: {
            title: '',
            annotation: '',
        },

        validate: {
            title: value => value.trim().length > 0 ? null : t('titleRequired')
        },
    })

    const handleSubmit = (values: CreateSlideFormValues) => {
        addSlide({
            title: values.title.trim(),
            annotation: values.annotation.trim(),
        })

        form.reset();
        close();
    };

    const handleClose = () => {
        form.reset();
        close();
    };

    return (
        <>
            <Button onClick={open}>
                {t('open')}
            </Button>

            <Modal
                opened={opened}
                onClose={handleClose}
                title={t('title')}
                centered
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label={t('slideTitle')}
                            placeholder={t('slideTitlePlaceholder')}
                            withAsterisk
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            label={t('annotation')}
                            placeholder={t('annotationPlaceholder')}
                            {...form.getInputProps('annotation')}
                        />

                        <Button type="submit">
                            {t('create')}
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}