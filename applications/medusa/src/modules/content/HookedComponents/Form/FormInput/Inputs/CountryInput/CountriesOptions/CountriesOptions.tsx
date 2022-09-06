import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CountriesOptionsQuery } from '@//:artifacts/CountriesOptionsQuery.graphql'
import { ComponentSearchArguments } from '../../../../../Search/types'

type CountriesOptionsProps = ComponentSearchArguments<any>

const Query = graphql`
  query CountriesOptionsQuery {
    countries {
      id
      name
    }
  }
`

export default function CountriesOptions ({ searchArguments }: CountriesOptionsProps): JSX.Element {
  const data = useLazyLoadQuery<CountriesOptionsQuery>(Query, searchArguments.variables, searchArguments.options)

  const sortedData = [...data.countries].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  return (
    <>
      {sortedData.map((item) =>
        <option key={item.id} value={item.id}>{item.name}</option>
      )}
    </>
  )
}
