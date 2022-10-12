import BannerPrompt from '@//:common/components/BannerPrompt/BannerPrompt'
import { Trans } from '@lingui/macro'
import { CurationProfileModal } from './CurationProfileModal/CurationProfileModal'
import { useDisclosure } from '@chakra-ui/react'

export default function CompleteFeedBanner (): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  return (
    <>
      <BannerPrompt
        bannerText={<Trans>Set up your curation profile so we can tailor your feed</Trans>}
        buttonText={<Trans>Set Up</Trans>}
        onClick={onOpen}
        colorScheme='primary'
      />
      <CurationProfileModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
