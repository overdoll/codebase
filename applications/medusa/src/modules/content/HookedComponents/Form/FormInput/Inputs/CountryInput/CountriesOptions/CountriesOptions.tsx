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

  return (
    <>
      {data.countries.map((item, index) =>
        <option key={index} value={item.id}>{item.name}</option>
      )}
    </>
  )
}
