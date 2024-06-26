import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { Badge, Flex, Stack } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import AddClubSlugAlias from './AddClubSlugAlias/AddClubSlugAlias'
import CopyCodeToClipboard from '@//:modules/content/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import ManageClubSlugAliases from './ManageClubSlugAliases/ManageClubSlugAliases'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { AliasesClubSettingsQuery } from '@//:artifacts/AliasesClubSettingsQuery.graphql'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<AliasesClubSettingsQuery>
}

const Query = graphql`
  query AliasesClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      slug
      id
      slugAliasesLimit
      viewerIsOwner
      slugAliases {
        slug
      }
      ...ManageClubSlugAliasesFragment
      ...AddClubSlugAliasFragment
    }
    viewer {
      isStaff
    }
  }
`

export default function AliasesClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AliasesClubSettingsQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club.viewerIsOwner && ((queryData.viewer?.isStaff) === false)) {
    return <NotFoundClub />
  }

  const clubLink = `overdoll.com/${queryData.club.slug}`

  const aliasesExist = queryData.club.slugAliases != null ? queryData.club.slugAliases?.length > 0 : false

  const disableSlugAdd = queryData.club.slugAliases.length === queryData.club.slugAliasesLimit

  return (
    <Stack spacing={4}>
      <SmallBackgroundBox>
        <Flex align='center' justify='space-between'>
          <CopyCodeToClipboard>
            {clubLink}
          </CopyCodeToClipboard>
          {aliasesExist &&
            <Badge
              ml={2}
              fontSize='xs'
              colorScheme='green'
            >
              <Trans>
                Default
              </Trans>
            </Badge>}
        </Flex>
      </SmallBackgroundBox>
      {aliasesExist && <ManageClubSlugAliases query={queryData.club} />}
      <Collapse>
        <CollapseButton size='md'>
          <Trans>
            Add Club Link Alias
          </Trans>
        </CollapseButton>
        <CollapseBody>
          {disableSlugAdd && (
            <Alert mb={2} status='warning'>
              <AlertIcon />
              <AlertDescription fontSize='sm'>
                <Trans>
                  You have added the maximum amount of aliases. You'll have to remove at least one alias to be
                  able to add another.
                </Trans>
              </AlertDescription>
            </Alert>)}
          <AddClubSlugAlias isDisabled={disableSlugAdd} query={queryData.club} />
        </CollapseBody>
      </Collapse>
    </Stack>
  )
}
