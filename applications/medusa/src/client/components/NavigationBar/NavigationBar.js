/**
 * @flow
 */
import type { Node } from 'react'
import { Tabs, Flex, TabList, Tab } from '@chakra-ui/react'

type Props = {};

export default function NavigationBar ({ ...rest }: Props): Node {
  return (
    <>
      <Flex align='center' right={0} left={0} top={0} position='fixed' h='56px' bg='gray.800'>
        <Tabs w='100%' align='center' isFitted variant='unstyled'>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
        </Tabs>
      </Flex>
    </>
  )
}
