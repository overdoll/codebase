import { ClickableTile } from '@//:modules/content/ContentSelection'
import { Box, BoxProps, Heading, HStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '@//:modules/constants/theme'
import { RemoveCross } from '@//:assets/icons'
import Icon from '../../../../../../../../../../../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'

interface Props extends Omit<BoxProps, 'title'> {
  onClick: () => void
  isInactive: boolean
  title: string
  id: string
  isActive: boolean
}

export default function PostsFilterBox (props: Props): JSX.Element {
  const {
    isInactive,
    onClick,
    title,
    id,
    isActive,
    ...rest
  } = props

  const memoized = useMemo(() => new Random(hash(id ?? DEFAULT_SEED)), [id])

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [id])

  const bgColor = TAG_COLOR_PALETTE[chosenColor]

  return (
    <ClickableTile w='auto' h='auto' onClick={onClick}>
      <Box
        maxW={400}
        borderRadius='lg'
        px={{
          base: 2,
          md: 3
        }}
        py={{
          base: 1,
          md: 2
        }}
        opacity={isInactive ? 0.4 : 1}
        bg={bgColor}
        {...rest}
      >
        <HStack spacing={2}>
          <Heading
            noOfLines={2}
            fontSize={{
              base: 'sm',
              md: 'lg'
            }}
            color='dimmers.700'
          >
            {title}
          </Heading>
          {isActive && (
            <Icon
              icon={RemoveCross}
              w={3}
              h={3}
              fill='dimmers.500'
            />
          )}
        </HStack>
      </Box>
    </ClickableTile>
  )
}
