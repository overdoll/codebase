import BlurredBackgroundThumbnail from '@//:common/components/BlurredBackgroundThumbnail/BlurredBackgroundThumbnail'
import { Flex, GridItem, Heading, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { OverdollLogoOutline } from '@//:assets/logos'

export default function RouletteScreenLoading (): JSX.Element {
  const variants = {
    pending: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  }

  return (
    <>
      <GridItem>
        <Flex h='100%' position='relative'>
          <BlurredBackgroundThumbnail backgroundImage='https://static.dollycdn.net/banners/roulette-banner.jpg' backgroundColor='gray.800' />
          <Flex bg='dimmers.300' position='relative' align='center' justify='center' w='100%' h='100%'>
            <motion.div
              animate='pending'
              variants={variants}
            >
              <Stack spacing={6}>
                <Icon icon={OverdollLogoOutline} w={36} h={36} fill='gray.00' />
                <Heading textAlign='center' color='whiteAlpha.800' fontSize='3xl'>
                  <Trans>
                    Loading
                  </Trans>
                </Heading>
              </Stack>
            </motion.div>
          </Flex>
        </Flex>
      </GridItem>
    </>
  )
}
