import { Suspense, useContext } from 'react'
import { FormInputContext } from '../../FormInput'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, SelectProps, Skeleton } from '@chakra-ui/react'
import CountriesOptions from './CountriesOptions/CountriesOptions'
import QueryErrorBoundary from '../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import useSearch from '../../../../Search/hooks/useSearch'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

type SelectInputProps = SelectProps

export default function CountryInput (props: SelectInputProps): JSX.Element {
  const { i18n } = useLingui()

  const {
    id,
    size
  } = useContext(FormInputContext)

  const {
    control
  } = useFormContext()

  const {
    loadQuery,
    searchArguments
  } = useSearch<{}>({})

  return (

    <Controller
      control={control}
      name={id}
      render={({
        field: {
          onChange,
          value
        },
        fieldState: {
          invalid
        }
      }) => (
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<Skeleton w='100%' h={16} />}>
            <Select
              placeholder={i18n._(t`Select a country`)}
              size={size}
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              isInvalid={invalid}
              {...props}
            >
              <CountriesOptions searchArguments={searchArguments} />
            </Select>
          </Suspense>
        </QueryErrorBoundary>
      )}
    />
  )
}
