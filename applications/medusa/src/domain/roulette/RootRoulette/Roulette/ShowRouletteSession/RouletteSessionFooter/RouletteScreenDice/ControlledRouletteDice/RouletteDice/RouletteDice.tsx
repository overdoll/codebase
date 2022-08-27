import { Flex, FlexProps, Heading, HeadingProps } from '@chakra-ui/react'
import BackgroundGlow from '../../../../../BackgroundGlow/BackgroundGlow'
import RouletteSpinningNumbers from './RouletteSpinningNumbers/RouletteSpinningNumbers'

interface Props {
  number: number | undefined
  isSpinning?: boolean
  numberCycleVariant: number
  showGlow?: boolean
  diceProps?: FlexProps
  headingProps?: HeadingProps
}

export default function RouletteDice (props: Props): JSX.Element {
  const {
    number,
    isSpinning = false,
    numberCycleVariant,
    showGlow = true,
    diceProps,
    headingProps
  } = props

  const TEXT_PROPS: HeadingProps = {
    fontSize: {
      base: '3xl',
      md: '4xl'
    },
    textAlign: 'center',
    ...headingProps
  }

  const DICE_PROPS: FlexProps = {
    w: {
      base: 12,
      md: 16
    },
    borderRadius: 'lg',
    h: {
      base: 12,
      md: 16
    },
    ...diceProps
  }

  const numberColorScheme = ['purple', 'teal', 'orange', 'primary', 'green', 'red']

  return (
    <Flex
      position='relative'
    >
      <BackgroundGlow
        isVisible={!isSpinning && number != null && showGlow}
        colorScheme={number != null ? numberColorScheme[number - 1] : 'gray'}
      />
      <Flex
        align='center'
        justify='center'
        bg={(number != null && !isSpinning) ? (showGlow ? `${numberColorScheme[number - 1]}.100` : 'gray.00') : 'gray.00'}
        position='relative'
        overflow='hidden'
        {...DICE_PROPS}
      >
        {isSpinning && (
          <RouletteSpinningNumbers variant={numberCycleVariant} />
        )}
        {!isSpinning && (
          <Heading
            {...TEXT_PROPS}
            color={(number != null && !isSpinning) ? (`${numberColorScheme[number - 1]}.300`) : 'blackAlpha.400'}
          >
            {number}
          </Heading>
        )}
      </Flex>
    </Flex>
  )
}
