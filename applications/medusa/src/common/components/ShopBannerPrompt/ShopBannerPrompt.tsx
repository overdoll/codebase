/* eslint-disable react/jsx-no-target-blank */
import { SHOP_LINK } from '@//:modules/constants/links'
import ShopBannerVariations from './ShopBannerVariations/ShopBannerVariations'
import posthog from 'posthog-js'
import { Flex, Portal } from '@chakra-ui/react'
import { useSessionStorage } from 'usehooks-ts'
import { useHydrate } from '@//:modules/hydrate'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'

export default function ShopBannerPrompt (): JSX.Element {
  const onClick = (): void => {
    posthog?.capture('click-shop-sticky-banner')
  }
  //

  const [isClosedShopBanner, setClosedShopBanner] = useSessionStorage('closedShopBanner', false)

  const onClose = (): void => {
    setClosedShopBanner(true)
    posthog?.capture('close-shop-sticky-banner')
  }

  const isHydrated = useHydrate()

  if (!isHydrated) return <></>

  if (isClosedShopBanner) {
    return <></>
  }

  return (
    <Portal>
      <Flex
        bottom={{ base: 'initial', md: 0 }}
        top={{ base: 0, md: 'initial' }}
        py={0.5}
        zIndex='docked'
        w='100%'
        borderTopWidth={2}
        borderBottomWidth={2}
        borderTopColor='primary.200'
        borderBottomColor='primary.200'
        justify='center'
        bg='primary.900'
        position='fixed'
      >
        <Flex w='100%' maxW='container.lg'>
          <Flex as='a' flexGrow={1} target='_blank' onClick={onClick} href={SHOP_LINK}>
            <ShopBannerVariations />
          </Flex>
          <CloseButton borderRadius='full' size='xs' colorScheme='white' flexShrink={0} onClick={onClose} />
        </Flex>
      </Flex>
    </Portal>
  )
}
