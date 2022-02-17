import { graphql, useFragment } from 'react-relay/hooks'
import { ClubAliasesFragment$key } from '@//:artifacts/ClubAliasesFragment.graphql'
import { Badge, Flex, useDisclosure } from '@chakra-ui/react'
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
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../components/Collapse/Collapse'

interface Props {
  query: ClubAliasesFragment$key | null
}

const Fragment = graphql`
  fragment ClubAliasesFragment on Club {
    slug
    ...AddClubSlugAliasFragment
    ...ManageClubSlugAliasesFragment
    slugAliases {
      __id
      slug
    }
  }
`

export default function ClubAliases ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const clubLink = `overdoll.com/${data?.slug as string}`

  const aliasesExist = data?.slugAliases != null ? data.slugAliases?.length > 0 : false

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
            <AddClubSlugAlias query={data} />
          </CollapseBody>
        </Collapse>
      </ListSpacer>
    </>
  )
}
