import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { IssueClubInfractionFormMutation } from '@//:artifacts/IssueClubInfractionFormMutation.graphql'
import { IssueClubInfractionFormFragment$key } from '@//:artifacts/IssueClubInfractionFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  RuleInput
} from '@//:modules/content/HookedComponents/Form'
import LockDurationSelect from '../../../../StaffAccount/StaffAccount/StaffLockAccount/StaffLockAccountForm/LockDurationSelect/LockDurationSelect'
import GenericTagId from '../../../../../validation/GenericTagId'

interface Props {
  query: IssueClubInfractionFormFragment$key
}

interface ClubInfractionValues {
  customEndTime: Date
  ruleId: string
}

const Fragment = graphql`
  fragment IssueClubInfractionFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation IssueClubInfractionFormMutation($input: IssueClubInfractionInput!) {
    issueClubInfraction(input: $input) {
      clubInfractionHistory {
        id
        club {
          id
          suspension {
            expires
          }
        }
        issuedAt
        expiresAt
        rule {
          title
        }
      }
    }
  }
`

export default function IssueClubInfractionForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<IssueClubInfractionFormMutation>(Mutation)

  const schema = Joi.object({
    customEndTime: Joi.date(),
    ruleId: GenericTagId()
  })

  const notify = useToast()

  const methods = useForm<ClubInfractionValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          clubId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully issued infraction to club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error issuing an infraction`
        })
      }
    }
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <FormInput
          id='ruleId'
          size='md'
        >
          <InputHeader>
            <Trans>
              Rule
            </Trans>
          </InputHeader>
          <RuleInput />
          <InputFooter />
        </FormInput>
        <FormInput
          id='customEndTime'
          size='md'
        >
          <InputHeader>
            <Trans>
              (Optional) Custom Duration
            </Trans>
          </InputHeader>
          <LockDurationSelect />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='orange'
        >
          <Trans>
            Issue Infraction
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
