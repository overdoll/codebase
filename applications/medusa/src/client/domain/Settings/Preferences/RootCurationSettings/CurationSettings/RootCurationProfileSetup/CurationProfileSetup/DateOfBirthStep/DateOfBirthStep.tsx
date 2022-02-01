import { graphql, useFragment } from 'react-relay/hooks'
import type { DateOfBirthStepFragment$key } from '@//:artifacts/DateOfBirthStepFragment.graphql'
import { FormControl, FormLabel, HStack, Input, InputGroup, Stack, Text, useNumberInput } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { Icon } from '@//:modules/content'
import { useLingui } from '@lingui/react'
import { AddPlus, SubtractMinus } from '@//:assets/icons/interface'
import differenceInYears from 'date-fns/differenceInYears'

interface Props {
  query: DateOfBirthStepFragment$key | null
}

const Fragment = graphql`
  fragment DateOfBirthStepFragment on CurationProfile {
    dateOfBirth {
      skipped
      completed
      dateOfBirth
    }
  }
`

export default function DateOfBirthStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const dateOfBirth = new Date(data?.dateOfBirth?.dateOfBirth as Date ?? undefined)

  const defaultValue = differenceInYears(new Date(), dateOfBirth)

  const onChange = (valueAsNumber): void => {

  }

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } =
    useNumberInput({
      step: 1,
      defaultValue: data?.dateOfBirth?.dateOfBirth != null ? defaultValue : undefined,
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
    <Stack spacing={2}>
      <form noValidate>
        <FormControl id='age'>
          <FormLabel fontSize='md'>
            <Trans>
              Your Age
            </Trans>
          </FormLabel>
          <HStack align='flex-start' spacing={2}>
            <IconButton
              size='lg'
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
        </FormControl>
      </form>
      <Text fontSize='sm'>
        <Trans>
          Telling us your age helps us to better tailor the content you are presented on the platform
        </Trans>
      </Text>
    </Stack>
  )
}
