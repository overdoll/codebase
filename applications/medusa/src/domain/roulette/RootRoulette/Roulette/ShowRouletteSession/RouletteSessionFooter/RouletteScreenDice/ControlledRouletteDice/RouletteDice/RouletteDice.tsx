import { Flex, Heading, HeadingProps } from '@chakra-ui/react'
import BackgroundGlow from '../../../../../BackgroundGlow/BackgroundGlow'
import RouletteSpinningNumbers from './RouletteSpinningNumbers/RouletteSpinningNumbers'

interface Props {
  number: number | undefined
  isSpinning?: boolean
  numberCycleVariant: number
  showGlow?: boolean
}

export default function RouletteDice (props: Props): JSX.Element {
  const {
    number,
    isSpinning = false,
    numberCycleVariant,
    showGlow = true
  } = props

  const TEXT_PROPS: HeadingProps = {
    fontSize: '3xl',
    textAlign: 'center'
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
        borderRadius='lg'
        borderWidth={0}
        borderColor={(number != null && !isSpinning) ? (showGlow ? `${numberColorScheme[number - 1]}.200` : `${numberColorScheme[number - 1]}.900`) : 'transparent'}
        w={12}
        h={12}
        bg={(number != null && !isSpinning) ? (showGlow ? `${numberColorScheme[number - 1]}.100` : `${numberColorScheme[number - 1]}.100`) : 'gray.00'}
        position='relative'
        overflow='hidden'
      >
        {isSpinning && (
          <RouletteSpinningNumbers variant={numberCycleVariant} />
        )}
        {!isSpinning && (
          <Heading
            {...TEXT_PROPS}
            color={(number != null && !isSpinning) ? (showGlow ? `${numberColorScheme[number - 1]}.500` : `${numberColorScheme[number - 1]}.900`) : 'blackAlpha.400'}
          >
            {number}
          </Heading>
        )}
      </Flex>
    </Flex>
  )
}
