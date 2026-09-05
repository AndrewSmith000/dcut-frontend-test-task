import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '@/entities/session'
import {useTranslation} from "react-i18next";

interface LoginFormValues {
    email: string
    password: string
}

export function LoginForm() {
    const navigate = useNavigate()
    const login = useSessionStore((state) => state.login)
    const { t } = useTranslation('login')

    const form = useForm<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : t('invalidEmail'),

            password: (value) =>
                value.length >= 3 ? null : t('passwordMinLength'),
        },
    })

    const handleSubmit = () => {
        const token = crypto.randomUUID()

        login(token)
        navigate('/', { replace: true })
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    label={t('email')}
                    placeholder={t('emailPlaceholder')}
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label={t('password')}
                    {...form.getInputProps('password')}
                />

                <Button type="submit">
                    {t('submit')}
                </Button>
            </Stack>
        </form>
    )
}