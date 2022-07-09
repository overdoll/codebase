import { ReactNode } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Can from '../../../../../../authorization/Can'
import LinkButton from '../../../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../../../../PageLayout'
import { ActionUnlock } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay'
import { PostSupporterContentLockedFragment$key } from '@//:artifacts/PostSupporterContentLockedFragment.graphql'

interface Props {
  children: ReactNode
  query: PostSupporterContentLockedFragment$key
}

const Fragment = graphql`
  fragment PostSupporterContentLockedFragment on Club {
    slug
  }
`

export default function PostSupporterContentLocked ({
  children,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box w='100%' h='100%' position='relative'>
      {children}
      <Stack
        bg='dimmers.400'
        h='100%'
        w='100%'
        top={0}
        right={0}
        position='absolute'
        align='center'
        justify='center'
        px={8}
        spacing={4}
        pointerEvents='none'
      >
        <Heading fontSize='lg' color='gray.00' textAlign='center'>
          <Trans>
            This content can only be seen if you are a supporter of the club
          </Trans>
        </Heading>
        <Can I='interact' a='Club' passThrough>
          {allowed => (
            <LinkButton
              pointerEvents='auto'
              href={allowed === false ? `/${data.slug}` : `/${data.slug}?support=true`}
              leftIcon={(
                <Icon
                  icon={ActionUnlock}
                  fill='orange.900'
                  h={4}
                  w={4}
                />)}
              size='lg'
              colorScheme='orange'
            >
              <Trans>
                Become a Supporter
              </Trans>
            </LinkButton>
          )}
        </Can>
      </Stack>
    </Box>
  )
}
