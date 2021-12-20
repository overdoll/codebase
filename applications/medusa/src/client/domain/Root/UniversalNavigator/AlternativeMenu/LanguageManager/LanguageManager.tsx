import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import { LanguageManagerQuery } from '@//:artifacts/LanguageManagerQuery.graphql'
import { ChangeEvent } from 'react'
import { Select } from '@chakra-ui/react'
import { LanguageManagerMutation } from '@//:artifacts/LanguageManagerMutation.graphql'
import { useHistory } from '@//:modules/routing'
import { RenderOnDesktop } from '@//:modules/content/PageLayout'

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

export default function LanguageManager (): JSX.Element {
  const query = useLazyLoadQuery<LanguageManagerQuery>(LanguageManagerGQL, {})

  const [commit, isInFlight] = useMutation<LanguageManagerMutation>(LanguageManagerMutationGQL)

  const history = useHistory()

  const onChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    commit({
      variables: {
        input: {
          locale: e.target.value
        }
      },
      updater (store, payload) {
        const locale = payload.updateLanguage?.language

        if (locale == null) return

        const root = store.getRoot()

        if (root == null) return

        history.go(0)
      }
    })
  }

  return (
    <RenderOnDesktop>
      <Select
        variant='filled'
        size='lg'
        isDisabled={isInFlight}
        defaultValue={query.language.locale}
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
    </RenderOnDesktop>
  )
}
