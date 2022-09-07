import { Flex, Grid, GridItem, Heading, HStack, Kbd, Stack, Text, TextProps } from '@chakra-ui/react'
import BlurredBackgroundThumbnail from '@//:common/components/BlurredBackgroundThumbnail/BlurredBackgroundThumbnail'
import { Trans } from '@lingui/macro'
import { ControlPlayButton, RandomizeDice } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import RouletteDice
  from '../../RouletteSessionFooter/RouletteScreenDice/ControlledRouletteDice/RouletteDice/RouletteDice'
import { motion } from 'framer-motion'

export default function RouletteScreenInstructions (): JSX.Element {
  const INSTRUCTIONS_FONT: TextProps = {
    textAlign: 'center',
    fontSize: {
      base: 'xs',
      md: 'sm'
    },
    color: 'gray.00'
  }

  const DICE_PROPS = {
    diceProps: {
      w: 10,
      h: 10
    },
    headingProps: {
      fontSize: 'xl'
    }
  }

  const GRID_PROPS = {
    templateColumns: {
      base: 'repeat(2, 1fr)',
      md: 'repeat(1, 1fr)'
    },
    templateRows: {
      base: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)'
    },
    columnGap: {
      base: 2,
      md: 8
    },
    rowGap: {
      base: 4,
      md: 8
    }
  }

  const GRID_ITEM_PROPS = {
    maxW: 300
  }

  const STACK_PROPS = {
    align: 'center',
    spacing: {
      base: 1,
      md: 3
    }
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -200
    },
    show: {
      opacity: [0, 0, 1],
      y: [null, 0],
      transition: {
        duration: 0.7
      }
    }
  }

  return (
    <GridItem>
      <Flex h='100%' position='relative' overflow='hidden'>
        <BlurredBackgroundThumbnail
          backgroundImage='https://static.dollycdn.net/banners/roulette-banner.jpg'
          backgroundColor='gray.800'
        />
        <Flex p={2} bg='dimmers.300' position='relative' w='100%' h='100%'>
          <motion.div
            initial='hidden'
            animate='show'
            variants={containerVariants}
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            <Stack align='center' justify='center' h='100%' w='100%' spacing={8}>
              <motion.div
                // @ts-expect-error
                variants={itemVariants}
              >
                <Stack
                  spacing={{
                    base: 1,
                    md: 2
                  }}
                  justify='center'
                >
                  <Icon
                    icon={RandomizeDice}
                    w={{
                      base: 12,
                      md: 16
                    }}
                    h={{
                      base: 12,
                      md: 16
                    }}
                    fill='gray.00'
                  />
                  <Heading
                    fontSize={{
                      base: 'xl',
                      md: '3xl'
                    }}
                    color='gray.00'
                    textAlign='center'
                  >
                    <Trans>
                      Rule34 Roulette
                    </Trans>
                  </Heading>
                  <Heading
                    fontSize={{
                      base: 'xs',
                      md: 'md'
                    }}
                    color='whiteAlpha.700'
                    textAlign='center'
                  >
                    <Trans>
                      Spin your way through Rule34, Hentai, Furry, 3D Porn Videos and Images
                    </Trans>
                  </Heading>
                </Stack>
              </motion.div>
              <Stack spacing={4}>
                <Grid w='100%' h='100%' {...GRID_PROPS}>
                  <GridItem {...GRID_ITEM_PROPS}>
                    <motion.div
                      // @ts-expect-error
                      variants={itemVariants}
                    >
                      <Stack {...STACK_PROPS}>
                        <Flex borderRadius='25%' align='center' justify='center' bg='green.300' w={10} h={10}>
                          <Icon icon={ControlPlayButton} w={4} h={4} fill='gray.00' />
                        </Flex>
                        <Text {...INSTRUCTIONS_FONT}>
                          <Trans>
                            Tap on the green button or hit <Kbd>SPACE</Kbd> to get a
                            random post and spin three dice
                          </Trans>
                        </Text>
                      </Stack>
                    </motion.div>
                  </GridItem>
                  <GridItem {...GRID_ITEM_PROPS}>
                    <motion.div
                      // @ts-expect-error
                      variants={itemVariants}
                    >
                      <Stack {...STACK_PROPS}>
                        <HStack spacing={3}>
                          <RouletteDice {...DICE_PROPS} showGlow={false} number={5} numberCycleVariant={1} />
                          <RouletteDice {...DICE_PROPS} showGlow={false} number={4} numberCycleVariant={2} />
                          <RouletteDice {...DICE_PROPS} showGlow={false} number={3} numberCycleVariant={3} />
                        </HStack>
                        <Text {...INSTRUCTIONS_FONT}>
                          <Trans>
                            Getting three unique numbers means you spin for a new post and three new dice
                          </Trans>
                        </Text>
                      </Stack>
                    </motion.div>
                  </GridItem>
                  <GridItem {...GRID_ITEM_PROPS}>
                    <motion.div
                      // @ts-expect-error
                      variants={itemVariants}
                    >
                      <Stack {...STACK_PROPS}>
                        <HStack spacing={3}>
                          <RouletteDice {...DICE_PROPS} number={1} numberCycleVariant={1} />
                          <RouletteDice {...DICE_PROPS} showGlow={false} number={2} numberCycleVariant={2} />
                          <RouletteDice {...DICE_PROPS} number={1} numberCycleVariant={3} />
                        </HStack>
                        <Text {...INSTRUCTIONS_FONT}>
                          <Trans>
                            Two of the same numbers (double) means you re-spin for three new dice but keep the same post
                          </Trans>
                        </Text>
                      </Stack>
                    </motion.div>
                  </GridItem>
                  <GridItem {...GRID_ITEM_PROPS}>
                    <motion.div
                      // @ts-expect-error
                      variants={itemVariants}
                    >
                      <Stack align='center' spacing={3}>
                        <HStack spacing={3}>
                          <RouletteDice {...DICE_PROPS} number={4} numberCycleVariant={1} />
                          <RouletteDice {...DICE_PROPS} number={4} numberCycleVariant={2} />
                          <RouletteDice {...DICE_PROPS} number={4} numberCycleVariant={3} />
                        </HStack>
                        <Text {...INSTRUCTIONS_FONT}>
                          <Trans>
                            Three of the same numbers (triple) means you HAVE to lose to the post you rolled to - no
                            excuses
                          </Trans>
                        </Text>
                      </Stack>
                    </motion.div>
                  </GridItem>
                </Grid>
              </Stack>
            </Stack>
          </motion.div>
        </Flex>
      </Flex>
    </GridItem>
  )
}
