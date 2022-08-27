import { Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Fragment } from 'react'

interface Props {
  variant: number
}

export default function RouletteSpinningNumbers (props: Props): JSX.Element {
  const {
    variant
  } = props

  // TODO warp the numbers in a "squeeze" fashion so it looks like they're moving

  const numberSetOne = [1, 2, 3, 4, 5, 6]

  const numberSetTwo = [1, 2, 3, 4, 5, 6]

  const numberSetThree = [3, 6, 1, 4, 2, 5]

  const rollingVariants = [
    {
      text: (
        <>{numberSetOne.map((item, index) => (
          <Fragment key={index}>{item}<br />
            <br />
          </Fragment>))}
        </>),
      props: {
        style: {
          position: 'absolute',
          bottom: 40
        },
        animate: {
          translateY: 470
        },
        transition: {
          duration: 0.85,
          repeat: Infinity,
          type: 'tween',
          ease: 'linear'
        }
      }
    },
    {
      text: (
        <>{numberSetTwo.map((item, index) => (
          <Fragment key={index}>
            {item}
            <br />
            <br />
          </Fragment>))}
        </>),
      props: {
        style: {
          position: 'absolute',
          top: 40
        },
        animate: {
          translateY: -470
        },
        transition: {
          duration: 0.95,
          repeat: Infinity,
          type: 'tween',
          ease: 'linear'
        }
      }
    },
    {
      text: (
        <>{numberSetThree.map((item, index) => (
          <Fragment key={index}>
            {item}
            <br />
            <br />
          </Fragment>))}
        </>),
      props: {
        style: {
          position: 'absolute',
          bottom: 40
        },
        animate: {
          translateY: 470
        },
        transition: {
          duration: 0.8,
          repeat: Infinity,
          type: 'tween',
          ease: 'linear'
        }
      }
    }
  ]
  return (
    // @ts-expect-error
    <motion.div
      {...rollingVariants[variant].props}
    >
      <Heading
        color='blackAlpha.400'
        fontSize='3xl'
        textAlign='center'
        filter='blur(1px)'
      >
        {rollingVariants[variant].text}
      </Heading>
    </motion.div>
  )
}
