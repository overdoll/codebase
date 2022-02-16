import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeAudienceStandardFragment$key } from '@//:artifacts/ChangeAudienceStandardFragment.graphql'
import { Heading, HStack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import { ChangeAudienceStandardMutation } from '@//:artifacts/ChangeAudienceStandardMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import Switch from '@//:modules/form/Switch/Switch'

interface Props {
  query: ChangeAudienceStandardFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceStandardFragment on Audience {
    id
    standard
  }
`

const Mutation = graphql`
  mutation ChangeAudienceStandardMutation($input: UpdateAudienceIsStandardInput!) {
    updateAudienceIsStandard(input: $input) {
      audience {
        id
        standard
      }
    }
  }
`

export default function ChangeAudienceStandard ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isPending] = useMutation<ChangeAudienceStandardMutation>(Mutation)

  const notify = useToast()

  const onChange = (e): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          standard: e.target.checked
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated audience standard`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating audience standard`
        })
      }
    }
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Audience Standard
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <HStack align='center' spacing={2}>
        <Switch
          isDisabled={isPending}
          defaultIsChecked={data.standard}
          onChange={onChange}
        />
        <Heading fontSize='lg' color='gray.00'>
          <Trans>
            Is standard?
          </Trans>
        </Heading>
      </HStack>
    </>
  )
}
