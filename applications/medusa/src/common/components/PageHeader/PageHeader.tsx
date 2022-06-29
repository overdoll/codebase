import { Box, Heading, HStack } from '@chakra-ui/react'
import PostOrderButton from './PostOrderButton/PostOrderButton'
import { ReactNode } from 'react'
import PostSupporterStatusButton from './PostSupporterStatusButton/PostSupporterStatusButton'
import SearchButton from './SearchButton/SearchButton'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  title: ReactNode
  hasSearch?: boolean
  hasSort?: boolean
  hasSupporter?: boolean
  hasDiscover?: boolean
}

export default function PageHeader ({
  title,
  hasSearch,
  hasSort,
  hasSupporter,
  hasDiscover
}: Props): JSX.Element {
  return (
    <Box>
      <HStack spacing={2} justify='space-between'>
        <Heading color='gray.00' fontSize='2xl'>
          {title}
        </Heading>
        {(hasDiscover === true || hasSearch === true) && (
          <HStack>
            {hasDiscover === true && (
              <LinkButton size='sm' href='/clubs/discover'>
                <Trans>
                  Discover Clubs
                </Trans>
              </LinkButton>
            )}
            {hasSearch === true && (
              <SearchButton />
            )}
          </HStack>
        )}
      </HStack>
      {(hasSort === true || hasSupporter === true) && (
        <HStack mt={2} spacing={2}>
          {hasSort === true && <PostOrderButton />}
          {hasSupporter === true && <PostSupporterStatusButton />}
        </HStack>
      )}
    </Box>
  )
}
