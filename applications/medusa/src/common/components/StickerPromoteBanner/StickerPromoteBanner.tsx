import { useCookies } from 'react-cookie'
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { DEFAULT_SEED } from '@//:modules/constants/theme'
import { Box, Heading } from '@chakra-ui/react'
import ClickableTile from '../../../modules/content/ContentSelection/ClickableTile/ClickableTile'
import { ExternalLink } from '@//:modules/routing'
import { SHOP_LINK } from '@//:modules/constants/links'
import { Trans } from '@lingui/macro'

export default function StickerPromoteBanner (): JSX.Element {

  const [cookies] = useCookies<string>(['od.local.postSeed'])
  const postSeed = cookies['od.local.postSeed']

  const memoized = useMemo(() => new Random(hash(postSeed ?? DEFAULT_SEED)), [postSeed ?? DEFAULT_SEED])

  const stickers = [{
    nsfw: 'https://static.dollycdn.net/stickers/omegaozone_1_nsfw.png',
    sfw: 'https://static.dollycdn.net/stickers/omegaozone_1_sfw.png',
  },
    {
      nsfw: 'https://static.dollycdn.net/stickers/oppaiforge_1_nsfw.png',
      sfw: 'https://static.dollycdn.net/stickers/oppaiforge_1_sfw.png',
    }]

  const chosen = useMemo(() => memoized.nextInt32([0, 1]), [postSeed ?? DEFAULT_SEED])
  return (
    <Box>
      <ExternalLink href={SHOP_LINK}>
        <ClickableTile h={48} w='100%' borderRadius='semi'>
          <Box bg='gray.900' w='100%' h='100%'>
            <Heading>
              <Trans>
                NEW
              </Trans>
            </Heading>
            <Heading>
              <Trans>
                NEW
              </Trans>
            </Heading>
          </Box>
          <>go to the shop</>
        </ClickableTile>
      </ExternalLink>
    </Box>)
}