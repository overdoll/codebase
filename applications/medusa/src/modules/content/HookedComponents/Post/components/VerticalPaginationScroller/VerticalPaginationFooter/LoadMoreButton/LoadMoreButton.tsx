import { Flex } from '@chakra-ui/react'
import Button from '../../../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { ArrowButtonRefresh } from '@//:assets/icons'
import { Icon } from '../../../../../../PageLayout'

interface Props {
  onClick: () => void
}

export default function LoadMoreButton (props: Props): JSX.Element {
  const { onClick } = props

  return (
    <Flex
      w='100%'
      h={16}
      justify='center'
    >
      <Button
        onClick={onClick}
        variant='ghost'
        size='md'
        color='gray.300'
        rightIcon={(
          <Icon icon={ArrowButtonRefresh} w={4} h={4} fill='gray.300' />
        )}
      >
        <Trans>
          Load More
        </Trans>
      </Button>
    </Flex>
  )
}
