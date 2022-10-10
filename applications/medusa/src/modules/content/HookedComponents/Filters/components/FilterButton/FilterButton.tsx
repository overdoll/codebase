import Button from '../../../../../form/Button/Button'
import { ReactNode } from 'react'
import { IconType } from '@//:types/components'
import { Icon } from '../../../../PageLayout'
import { Box } from '@chakra-ui/react'
import { ActionUnlock } from '@//:assets/icons'

interface Props {
  onClickEnabled: () => void
  onClickLocked: () => void
  isLocked: boolean
  isActive: boolean
  title: ReactNode
  icon?: IconType
  hasBadge?: boolean
}

export default function FilterButton (props: Props): JSX.Element {
  const {
    onClickEnabled,
    onClickLocked,
    isLocked,
    isActive,
    title,
    icon,
    hasBadge
  } = props

  const onClick = (): void => {
    if (isLocked) {
      onClickLocked()
      return
    }
    onClickEnabled()
  }

  return (
    <Button
      onClick={onClick}
      colorScheme={isActive ? 'primary' : 'white'}
      borderRadius='full'
      color={isActive ? 'gray.00' : 'gray.900'}
      position='relative'
      flexShrink={0}
      leftIcon={icon != null
        ? <Icon
            icon={isLocked ? ActionUnlock : icon}
            fill={isActive ? 'gray.00' : 'gray.900'}
            w={4}
            h={4}
          />
        : undefined}
      size='sm'
      variant='solid'
    >
      {title}
      {hasBadge === true && (
        <Box
          w={3}
          h={3}
          top={-0.5}
          right={-0.5}
          borderRadius='full'
          bg='teal.300'
          position='absolute'
        />
      )}
    </Button>
  )
}
