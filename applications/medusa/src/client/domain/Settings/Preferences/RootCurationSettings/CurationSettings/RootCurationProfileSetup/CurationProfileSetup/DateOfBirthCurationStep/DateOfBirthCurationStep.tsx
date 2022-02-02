import { graphql, useFragment } from 'react-relay/hooks'
import type { DateOfBirthCurationStepFragment$key } from '@//:artifacts/DateOfBirthCurationStepFragment.graphql'
import { Box, HStack, Input, InputGroup, Stack, useNumberInput } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { Icon } from '@//:modules/content'
import { useLingui } from '@lingui/react'
import { AddPlus, SubtractMinus } from '@//:assets/icons/interface'
import differenceInYears from 'date-fns/differenceInYears'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import subYears from 'date-fns/subYears'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'

interface Props {
  query: DateOfBirthCurationStepFragment$key | null
}

const Fragment = graphql`
  fragment DateOfBirthCurationStepFragment on CurationProfile {
    dateOfBirth {
      dateOfBirth
    }
  }
`

export default function DateOfBirthCurationStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)

  const defaultValue = state.dateOfBirth.value != null
    ? differenceInYears(new Date(), new Date(state.dateOfBirth.value))
    : data?.dateOfBirth?.dateOfBirth != null
      ? differenceInYears(new Date(), new Date(data?.dateOfBirth?.dateOfBirth as Date))
      : undefined

  const onChange = (valueAsNumber): void => {
    const subYearsFromValue = subYears(new Date(), valueAsNumber)
    dispatch({
      type: 'dateOfBirth',
      value: valueAsNumber === '' ? null : subYearsFromValue
    })
  }

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } =
    useNumberInput({
      step: 1,
      defaultValue: defaultValue,
      min: 18,
      max: 99,
      onChange: onChange,
      isRequired: false
    })

  const incrementProps = getIncrementButtonProps()
  const decrementProps = getDecrementButtonProps()
  const inputProps = getInputProps()

  const { i18n } = useLingui()

  return (

    <Box>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            Telling us your age helps us to better tailor the content you are presented on the platform.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack h='100%' spacing={2}>
        <HStack align='flex-start' spacing={2}>
          <IconButton
            size='lg'
            colorScheme='gray'
            aria-label={i18n._(t`Remove`)}
            icon={
              <Icon
                icon={SubtractMinus}
                w={4}
                fill='gray.100'
                h={4}
              />
            }
            {...decrementProps}
          />
          <InputGroup size='lg'>
            <Input
              onChange={onChange}
              variant='filled'
              placeholder={i18n._(t`Your age`)}
              {...inputProps}
            />
          </InputGroup>
          <IconButton
            size='lg'
            colorScheme='gray'
            aria-label={i18n._(t`Add`)}
            icon={
              <Icon
                icon={AddPlus}
                w={4}
                fill='gray.100'
                h={4}
              />
            }
            {...incrementProps}
          />
        </HStack>
      </Stack>
    </Box>
  )
}
