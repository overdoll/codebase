import { ReactNode } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { OverdollLogo } from '@//:assets/logos'
import { Icon } from '@//:modules/content/PageLayout'

interface Props {
  children: ReactNode
}

export default function DiceTable (props: Props): JSX.Element {
  const {
    children
  } = props

  return (
    <Flex
      h={{
        base: 24,
        md: 36
      }}
      align='flex-start'
      justify='center'
      position='relative'
      w='100%'
      bg='gray.800'
      borderRadius='xl'
    >
      <Flex
        top={0}
        w='100%'
        h='100%'
        align='center'
        justify='center'
        position='absolute'
        pointerEvents='none'
        overflow='hidden'
      >
        <Icon icon={OverdollLogo} fill='gray.600' w={250} h={250} />
      </Flex>
      <Flex
        bottom={0}
        right={1}
        pointerEvents='none'
        position='absolute'
      >
        <Heading fontSize='sm' color='gray.500'>
          overdoll.com/roulette
        </Heading>
      </Flex>
      <Flex
        h='100%'
        align='center'
        justify='center'
        position='relative'
        w='100%'
      >
        {children}
      </Flex>
    </Flex>
  )
}
