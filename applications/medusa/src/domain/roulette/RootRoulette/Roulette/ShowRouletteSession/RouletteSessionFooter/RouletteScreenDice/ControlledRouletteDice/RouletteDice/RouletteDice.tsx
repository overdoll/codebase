import { Flex, Heading, HeadingProps } from '@chakra-ui/react'
import BackgroundGlow from '../../../../../BackgroundGlow/BackgroundGlow'
import RouletteSpinningNumbers from './RouletteSpinningNumbers/RouletteSpinningNumbers'

interface Props {
  number: number | undefined
  isSpinning?: boolean
  numberCycleVariant: number
}

export default function RouletteDice (props: Props): JSX.Element {
  const {
    number,
    isSpinning = false,
    numberCycleVariant
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
        isVisible={!isSpinning && number != null}
        colorScheme={number != null ? numberColorScheme[number - 1] : 'gray'}
      />
      <Flex
        align='center'
        justify='center'
        borderRadius='lg'
        borderWidth={3}
        borderColor={(number != null && !isSpinning) ? `${numberColorScheme[number - 1]}.200` : 'transparent'}
        w={12}
        h={12}
        bg='gray.00'
        position='relative'
        overflow='hidden'
      >
        {isSpinning && (
          <RouletteSpinningNumbers variant={numberCycleVariant} />
        )}
        {!isSpinning && (
          <Heading
            {...TEXT_PROPS}
            color={(number != null && !isSpinning) ? `${numberColorScheme[number - 1]}.500` : 'blackAlpha.400'}
          >
            {number}
          </Heading>
        )}
      </Flex>
    </Flex>
  )
}
