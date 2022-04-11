import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import { LanguageManagerQuery } from '@//:artifacts/LanguageManagerQuery.graphql'
import { ChangeEvent, useEffect } from 'react'
import { LanguageManagerMutation } from '@//:artifacts/LanguageManagerMutation.graphql'
import { useFragment } from 'react-relay'
import { LanguageManagerAccountMutation } from '@//:artifacts/LanguageManagerAccountMutation.graphql'
import { LanguageManagerFragment$key } from '@//:artifacts/LanguageManagerFragment.graphql'
import { t } from '@lingui/macro'
import Select from '@//:modules/form/Select/Select'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useRouter } from 'next/router'

interface Props {
  queryRef: LanguageManagerFragment$key | null
}

const LanguageManagerGQL = graphql`
  query LanguageManagerQuery {
    languages {
      locale
      name
    }
    language {
      locale
      name
    }
  }
`

const LanguageManagerFragmentGQL = graphql`
  fragment LanguageManagerFragment on Account {
    language {
      locale
    }
  }
`

const LanguageManagerMutationGQL = graphql`
  mutation LanguageManagerMutation($input: UpdateLanguageInput!) {
    updateLanguage(input: $input) {
      language {
        locale
        name
      }
    }
  }
`

const LanguageManagerAccountMutationGQL = graphql`
  mutation LanguageManagerAccountMutation($input: UpdateAccountLanguageInput!) {
    updateAccountLanguage(input: $input) {
      language {
        locale
        name
      }
    }
  }
`

export default function LanguageManager ({ queryRef }: Props): JSX.Element {
  const query = useLazyLoadQuery<LanguageManagerQuery>(LanguageManagerGQL, {})

  const data = useFragment(LanguageManagerFragmentGQL, queryRef)

  const [updateBrowserLanguage, isUpdatingBrowserLanguage] = useMutation<LanguageManagerMutation>(LanguageManagerMutationGQL)
  const [updateAccountLanguage, isUpdatingAccountLanguage] = useMutation<LanguageManagerAccountMutation>(LanguageManagerAccountMutationGQL)

  const router = useRouter()

  const notify = useToast()

  // if account language does not match up with the current language, change the language
  useEffect(() => {
    if (data != null) {
      if (data?.language?.locale !== query?.language?.locale) {
        notify({
          status: 'info',
          title: t`Changing to your preferred language...`
        })

        updateLanguage(data.language.locale)
      }
    }
  }, [])

  const updateLanguage = (lang: string, updateAccount = false): void => {
    updateBrowserLanguage({
      variables: {
        input: {
          locale: lang
        }
      },
      onCompleted (data) {
        if (data.updateLanguage?.language == null) {
          return
        }

        // logged in - also update the account language
        if (updateAccount) {
          updateAccountLanguage({
            variables: {
              input: {
                locale: lang
              }
            },
            onCompleted (data) {
              if (data.updateAccountLanguage?.language == null) {
                return
              }

              router.reload()
            }
          })
          return
        }
        router.reload()
      }
    })
  }

  // on change select
  const onChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    updateLanguage(e.target.value, data != null)
  }

  return (
    <Select
      variant='outline'
      size='lg'
      minW={150}
      h='50px'
      isDisabled={isUpdatingBrowserLanguage || isUpdatingAccountLanguage}
      defaultValue={query?.language?.locale}
      onChange={onChange}
    >
      {query.languages.map(lang => (
        <option
          key={lang.locale}
          value={lang.locale}
        >
          {lang.name}
        </option>
      ))}
    </Select>
  )
}
