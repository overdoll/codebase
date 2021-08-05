import { useTranslation } from 'react-i18next'
import MailSendEnvelope from '@streamlinehq/streamlinehq/img/streamline-mini-bold/mail/send/mail-send-envelope.svg'
import { MenuItem, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'

export default function Resend (props: Props): Node {
  const [t] = useTranslation('settings')

  return (
    <MenuItem justify='center'>
      <Icon pointerEvents='none' icon={MailSendEnvelope} fill='gray.100' w={4} h={4} mr={2} />
      <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.resend.button')}</Text>
    </MenuItem>
  )
}
