import { Box, Fade, Heading, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import AdvertBoxWrapper from '../AdvertBoxWrapper/AdvertBoxWrapper'
import { Trans } from '@lingui/macro'
import { ContentBrushPen, PremiumStar } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { ReactNode, useEffect, useState } from 'react'
import { Timeout } from '@//:types/components'

let timeout: null | Timeout = null

export default function BenefitsTransition (): JSX.Element {
  const [index, setIndex] = useState(0)

  const ListItem = ({
    children,
    colorScheme
  }: { children: ReactNode, colorScheme: string }): JSX.Element => {
    return (
      <HStack align='center' spacing={3}>
        <Icon flexShrink={0} icon={PremiumStar} fill={`${colorScheme}.200`} w={4} h={4} />
        <Heading fontSize='md' color={`${colorScheme}.200`}>
          <Trans>
            {children}
          </Trans>
        </Heading>
      </HStack>
    )
  }

  useEffect(() => {
    const refreshLoop = (): void => {
      setIndex(x => x === 0 ? 1 : 0)
      timeout = setTimeout(refreshLoop, 10000)
    }

    timeout = setTimeout(refreshLoop, 10000)

    return () => {
      if (timeout != null) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <AdvertBoxWrapper>
      <Tabs index={index} variant='soft-rounded' colorScheme='gray' isFitted>
        <Box w='100%' h={425}>
          <TabPanels h='100%'>
            <TabPanel h='100%' py={0}>
              <Fade style={{ height: '100%' }} in={index === 0}>
                <Stack h='100%' justify='center' spacing={6}>
                  <Box>
                    <HStack align='center' spacing={3}>
                      <Icon icon={ContentBrushPen} fill='teal.400' w={6} h={6} />
                      <Heading fontSize='3xl' color='teal.400'>
                        <Trans>
                          For Artists
                        </Trans>
                      </Heading>
                    </HStack>
                    <Heading fontSize='md' color='gray.200'>
                      <Trans>
                        Creating adult digital content
                      </Trans>
                    </Heading>
                  </Box>
                  <Stack spacing={3}>
                    <ListItem colorScheme='teal'>
                      <Trans>
                        Collect paid supporter revenue
                      </Trans>
                    </ListItem>
                    <ListItem colorScheme='teal'>
                      <Trans>
                        Post free and/or exclusive content
                      </Trans>
                    </ListItem>
                    <ListItem colorScheme='teal'>
                      <Trans>
                        Have your content distributed across the platform
                      </Trans>
                    </ListItem>
                  </Stack>
                </Stack>
              </Fade>
            </TabPanel>
            <TabPanel h='100%' py={0}>
              <Fade style={{ height: '100%' }} in={index === 1}>
                <Stack h='100%' justify='center' spacing={6}>
                  <Box>
                    <HStack align='center' spacing={3}>
                      <Icon icon={ContentBrushPen} fill='green.400' w={6} h={6} />
                      <Heading fontSize='3xl' color='green.400'>
                        <Trans>
                          For Fans
                        </Trans>
                      </Heading>
                    </HStack>
                    <Heading fontSize='md' color='gray.200'>
                      <Trans>
                        Of adult digital content
                      </Trans>
                    </Heading>
                  </Box>
                  <Stack spacing={3}>
                    <ListItem colorScheme='green'>
                      <Trans>
                        Support your favorite artists
                      </Trans>
                    </ListItem>
                    <ListItem colorScheme='green'>
                      <Trans>
                        Find any type of content
                      </Trans>
                    </ListItem>
                    <ListItem colorScheme='green'>
                      <Trans>
                        Construct a personalized content feed
                      </Trans>
                    </ListItem>
                  </Stack>
                </Stack>
              </Fade>
            </TabPanel>
          </TabPanels>
        </Box>
        <TabList>
          <Tab>
            <Trans>
              For Artists
            </Trans>
          </Tab>
          <Tab>
            <Trans>
              For Fans
            </Trans>
          </Tab>
        </TabList>
      </Tabs>
    </AdvertBoxWrapper>
  )
}
