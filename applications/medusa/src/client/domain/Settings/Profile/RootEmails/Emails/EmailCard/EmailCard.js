/**
 * @flow
 */
import type { Node } from 'react'
import {
  Badge, Box,
  Flex, Heading, IconButton, Menu, MenuButton, MenuList, Text, Stack, Spacer
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import { useTranslation } from 'react-i18next'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { EmailCardFragment$key } from '@//:artifacts/EmailCardFragment.graphql'
import MakePrimary from './MakePrimary/MakePrimary'
import Delete from './Delete/Delete'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Resend from './Resend/Resend'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  emails: EmailCardFragment$key,
  connectionID: EmailsSettingsFragment$key
};

const EmailCardFragmentGQL = graphql`
  fragment EmailCardFragment on AccountEmail {
    ...DeleteFragment
    ...MakePrimaryFragment
    email
    status
  }
`

export default function EmailCard ({ emails, connectionID }: Props): Node {
  const data = useFragment(EmailCardFragmentGQL, emails)

  const [t] = useTranslation('settings')

  return (
    <SmallBackgroundBox>
      <Flex justify='space-between' w='100%'>
        <Stack spacing={1}>
          <Flex mr={2} wordBreak='break-all'>
            <Text color='gray.00' fontSize='sm'>
              {data.email}
            </Text>
          </Flex>
          <Box>
            {data.status === 'PRIMARY' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>}
            {data.status === 'CONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.confirmed.hint1')}</Text>}
            {data.status === 'UNCONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>}
          </Box>
        </Stack>
        <Flex direction='column' align='flex-end'>
          <Badge
            fontSize='xs'
            colorScheme={
              data.status === 'PRIMARY'
                ? 'green'
                : data.status === 'CONFIRMED'
                  ? 'purple'
                  : 'orange'
            }
          >
            {data.status}
          </Badge>
          <Spacer />
          {data.status !== 'PRIMARY' &&
            <Menu mt={1} autoSelect={false}>
              <MenuButton
                bg='transparent'
                size='xs'
                as={IconButton}
                icon={
                  <Icon
                    icon={InterfaceSettingCog} w={4}
                    fill='gray.300' h={4}
                  />
              }
              />
              <MenuList boxShadow='xs'>
                {data.status === 'CONFIRMED' &&
                  <MakePrimary emails={data} connectionID={connectionID} />}
                {data.status === 'UNCONFIRMED' &&
                  <Resend />}
                {(data.status === 'CONFIRMED') &&
                  <Delete emails={data} connectionID={connectionID} />}
              </MenuList>
            </Menu>}
        </Flex>
      </Flex>
    </SmallBackgroundBox>
  )
}
