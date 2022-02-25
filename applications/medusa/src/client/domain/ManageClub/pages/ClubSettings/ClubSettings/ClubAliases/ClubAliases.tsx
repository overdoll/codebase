import { graphql, useFragment } from 'react-relay/hooks'
import { ClubAliasesFragment$key } from '@//:artifacts/ClubAliasesFragment.graphql'
import { Badge, Flex } from '@chakra-ui/react'
import {
  ListSpacer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap,
  SmallBackgroundBox
} from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import AddClubSlugAlias from './AddClubSlugAlias/AddClubSlugAlias'
import CopyCodeToClipboard from '../../../../../../components/ContentHints/CopyCodeToClipboard/CopyCodeToClipboard'
import ManageClubSlugAliases from './ManageClubSlugAliases/ManageClubSlugAliases'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../modules/content/ThemeComponents/Collapse/Collapse'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'

interface Props {
  query: ClubAliasesFragment$key
}

const Fragment = graphql`
  fragment ClubAliasesFragment on Club {
    slug
    ...AddClubSlugAliasFragment
    ...ManageClubSlugAliasesFragment
    slugAliasesLimit
    slugAliases {
      __id
      slug
    }
  }
`

export default function ClubAliases ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const clubLink = `overdoll.com/${data?.slug}`

  const aliasesExist = data?.slugAliases != null ? data.slugAliases?.length > 0 : false

  const disableSlugAdd = data?.slugAliases.length === data?.slugAliasesLimit

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Link
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          You can have up to 5 different aliases to your club link so any old links don't break if you decide to change
          your club name.
        </PageSectionDescription>
      </PageSectionWrap>
      <ListSpacer>
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
        {aliasesExist && <ManageClubSlugAliases query={data} />}
        <Collapse>
          <CollapseButton>
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
            <AddClubSlugAlias isDisabled={disableSlugAdd} query={data} />
          </CollapseBody>
        </Collapse>
      </ListSpacer>
    </>
  )
}
