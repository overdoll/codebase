import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ClubFooterShareLinkButtonFragment$key } from '@//:artifacts/ClubFooterShareLinkButtonFragment.graphql'
import { Flex, Input } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

interface Props {
  clubQuery: ClubFooterShareLinkButtonFragment$key
}

const ClubFragment = graphql`
  fragment ClubFooterShareLinkButtonFragment on Club {
    slug
  }
`

export default function ClubFooterShareLinkButton (props: Props): JSX.Element {
  const { clubQuery } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  }, true)

  const fullLink = `https://overdoll.com${resolved}`

  const [, onCopy] = useCopyToClipboardWrapper({ text: fullLink })

  return (
    <Flex w='100%'>
      <Input
        size='sm'
        readOnly
        variant='filled'
        placeholder=''
        value={fullLink}
        borderRightRadius='none'
      />
      <Button
        borderLeftRadius='none'
        size='sm'
        onClick={onCopy}
      >
        <Trans>
          Copy Link
        </Trans>
      </Button>
    </Flex>
  )
}
