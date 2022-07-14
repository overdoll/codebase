import { useContext } from 'react'
import { FormInputContext } from '../../../FormInput'
import { HStack, Input, useNumberInput } from '@chakra-ui/react'
import IconButton from '../../../../../../../form/IconButton/IconButton'
import { t } from '@lingui/macro'
import { Icon } from '../../../../../../PageLayout'
import { AddPlus, SubtractMinus } from '@//:assets/icons'
import { useLingui } from '@lingui/react'

interface Props {
  onChange: (value) => void
  value: number
}

export default function NumberInput ({
  onChange,
  value
}: Props): JSX.Element {
  const {
    size
  } = useContext(FormInputContext)

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } =
    useNumberInput({
      step: 1,
      min: 0,
      max: 9999,
      defaultValue: value,
      onChange (valueAsString: string, valueAsNumber: number) {
        onChange(valueAsNumber)
      }
    })

  const incrementProps = getIncrementButtonProps()
  const decrementProps = getDecrementButtonProps()
  const inputProps = getInputProps()

  const { i18n } = useLingui()

  return (
    <HStack w='100%' spacing={2}>
      <IconButton
        size={size}
        colorScheme='gray'
        aria-label={i18n._(t`Subtract`)}
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
      <Input
        w='100%'
        variant='filled'
        size={size}
        placeholder={i18n._(t`Enter a weight 0-9999. Higher will show up first.`)}
        {...inputProps}
      />
      <IconButton
        size={size}
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
  )
}
