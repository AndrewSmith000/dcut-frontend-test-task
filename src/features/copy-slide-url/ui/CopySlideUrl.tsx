import { useState } from "react";
import { Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

interface CopySlideUrlProps {
    slideId: string
}

export function CopySlideUrl({ slideId }: CopySlideUrlProps) {
    const { t } = useTranslation('copySlideUrl')
    const [searchParams] = useSearchParams()

    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const params = new URLSearchParams(searchParams)

        params.set('slide', slideId)

        const url = `${window.location.origin}${window.location.pathname}#/?${params}`

        await navigator.clipboard.writeText(url)

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    return (
        <Button
            variant="light"
            onClick={handleCopy}
        >
            {copied ? t('copied') : t('copy')}
        </Button>
    )
}