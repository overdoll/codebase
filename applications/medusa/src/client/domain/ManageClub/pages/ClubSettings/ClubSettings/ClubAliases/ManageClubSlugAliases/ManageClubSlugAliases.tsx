import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ManageClubSlugAliasesFragment$key } from '@//:artifacts/ManageClubSlugAliasesFragment.graphql'
import { ListSpacer, SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { Badge, Flex, Text, useToast } from '@chakra-ui/react'
import { CheckMark, DeleteBin } from '@//:assets/icons/interface'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { ManageClubSlugAliasesRemoveMutation } from '@//:artifacts/ManageClubSlugAliasesRemoveMutation.graphql'
import { useHistory } from '@//:modules/routing'

interface Props {
  query: ManageClubSlugAliasesFragment$key | null
}

const Fragment = graphql`
  fragment ManageClubSlugAliasesFragment on Club {
    id
    slug
    slugAliases {
      slug
    }
  }
`

const RemoveClubSlugMutationGQL = graphql`
  mutation ManageClubSlugAliasesRemoveMutation ($id: ID!, $slug: String!) {
    removeClubSlugAlias(input: {id: $id, slug: $slug}) {
      club {
        id
        slugAliases {
          slug
        }
      }
    }
  }
`

const PromoteClubSlugMutationGQL = graphql`
  mutation ManageClubSlugAliasesPromoteMutation ($id: ID!, $slug: String!) {
    promoteClubSlugAliasToDefault(input: {id: $id, slug: $slug}) {
      club {
        id
        slug
        slugAliases {
          slug
        }
      }
    }
  }
`

export default function ManageClubSlugAliases ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [removeSlug, isRemovingSlug] = useMutation<ManageClubSlugAliasesRemoveMutation>(RemoveClubSlugMutationGQL)

  const [promoteSlug, isPromotingSlug] = useMutation<ManageClubSlugAliasesRemoveMutation>(PromoteClubSlugMutationGQL)

  const history = useHistory()

  const { i18n } = useLingui()

  const notify = useToast()

  const onRemoveSlug = (slug): void => {
    if (data?.id == null) return

    removeSlug({
      variables: {
        id: data.id,
        slug: slug
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully removed the link alias ${slug}. You can no longer use this link.`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error removing the link alias`,
          isClosable: true
        })
      }
    }
    )
  }

  const onPromoteSlug = (slug): void => {
    if (data?.id == null) return

    promoteSlug({
      variables: {
        id: data.id,
        slug: slug
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully promoted the link alias ${slug} to default`,
          isClosable: true
        })
        history.push(`/club/${slug as string}/settings`)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error promoting the link alias to default`,
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <ListSpacer>
      {data?.slugAliases.map((item, index) =>
        <SmallBackgroundBox py={2} key={index}>
          <Flex align='center' justify='space-between'>
            <Text fontSize='sm' fontFamily='mono'>
              overdoll.com/{item.slug}
            </Text>
            <Flex align='center'>
              <Badge
                mx={2}
                fontSize='xs'
                colorScheme='purple'
              >
                <Trans>
                  Alias
                </Trans>
              </Badge>
              <SmallMenuButton>
                <SmallMenuItem
                  icon={CheckMark}
                  text={i18n._(t`Set Default`)}
                  isDisabled={isRemovingSlug || isPromotingSlug}
                  onClick={() => onPromoteSlug(item.slug)}
                />
                <SmallMenuItem
                  color='orange.300'
                  icon={DeleteBin}
                  text={i18n._(t`Remove Alias`)}
                  onClick={() => onRemoveSlug(item.slug)}
                  isDisabled={isRemovingSlug || isPromotingSlug}
                />
              </SmallMenuButton>
            </Flex>

          </Flex>
        </SmallBackgroundBox>)}
    </ListSpacer>
  )
}
