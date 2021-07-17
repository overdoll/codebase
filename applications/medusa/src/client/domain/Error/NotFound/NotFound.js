/**
 * @flow
 */
import type { Node } from 'react'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useTranslation } from 'react-i18next'
import { Center, Flex, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/button'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { graphql } from 'graphql'

const TestQueryGQL = graphql`
  query NotFoundQuery {
    node(id: "testid123") {
      id
      ... on Test {
        __typename
        test
      }
    }
  }
`

export default function NotFound (): Node {
  const [t] = useTranslation('empty')

  const data = useLazyLoadQuery(TestQueryGQL)

  console.log(data)

  return (
    <>
      <Helmet title='error' />
      <Center mt={40}>
        <Flex w={['sm', 'md', 'lg']} direction='column'>
          <Icon
            icon={SignBadgeCircle}
            color='red.500'
            w={100}
            h={100}
            ml='auto'
            mr='auto'
            mb={8}
          />
          <Heading size='md' align='center' color='gray.00'>
            {t('empty.header')}
          </Heading>
          <Center mt={8}>
            <Stack direction={['column', 'row']} spacing='24px'>
              <Button
                size='lg'
                onClick={() => {
                  history.back()
                }}
              >
                {t('empty.leave')}
              </Button>
              <Button
                size='lg'
                colorScheme='red'
                onClick={() => {
                  history.back()
                }}
              >
                {t('empty.home')}
              </Button>
            </Stack>
          </Center>
        </Flex>
      </Center>
    </>
  )
}
