/**
 * @flow
 */
import type { Node } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import Register from '../Register/Register'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql'
import { Icon } from '@//:modules/content'
import UAParser from 'ua-parser-js'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useFlash } from '@//:modules/flash'
import { Helmet } from 'react-helmet-async'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'

export default function Confirmation (props: Props): Node {
  const [t] = useTranslation('token')
  const history = useHistory()

  const { flash } = useFlash()

  return null
}
