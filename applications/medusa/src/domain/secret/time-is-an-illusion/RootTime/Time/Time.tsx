import { Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DISCORD_LINK } from '@//:modules/constants/links'
import { ExternalLink } from '@//:modules/routing'

export default function Time (): JSX.Element {
  const getTime = (): number => {
    return Math.floor(Date.now() / 1000)
  }

  const [time, setTime] = useState(getTime())

  const startTime = 1660000000

  const endTime = 1671005968

  const timeRequired = endTime - startTime

  const currentTimeDifference = time - startTime

  const finalSize = 50

  const timedSize = (currentTimeDifference / timeRequired) * finalSize

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: [null, 1],
      transition: {
        duration: 0.7,
        staggerChildren: 5
      }
    }
  }

  const itemVariants = {
    start: {
      opacity: 0
    },
    show: {
      opacity: [0, 1],
      transition: {
        duration: 5
      }
    }
  }

  useEffect(() => {
    const timerObject = setTimeout(() => {
      setTime(getTime())
    }, 1000)
    return () => clearTimeout(timerObject)
  })

  return (
    <Flex direction='column' h='100%' w='100%' align='center' justify='center'>
      <Flex
        transformOrigin='center'
        borderRadius='full'
        bg='#fff'
        transform={`scale(${timedSize})`}
        w='1px'
        h='1px'
      />
      <motion.div
        initial='hidden'
        // @ts-expect-error
        variants={containerVariants}
        animate='show'
      >
        <motion.div
          variants={itemVariants}
        >
          <Heading textAlign='center' mt={12} fontSize='sm' color='#fff'>
            I... I don't know how this got here... it must be a mistake...
          </Heading>
        </motion.div>
        <motion.div
          variants={itemVariants}
        >
          <ExternalLink href={DISCORD_LINK}>
            <Heading textAlign='center' mt={12} fontSize='xs' color='#fff'>
              discuss
            </Heading>
          </ExternalLink>
        </motion.div>
      </motion.div>
    </Flex>
  )
}
