import { Menu } from '../../../../../ThemeComponents/Menu/Menu'
import Can from '../../../../../../authorization/Can'
import { IconButtonProps } from '@chakra-ui/react'

type Props = Omit<IconButtonProps, 'aria-label'>

export default function PostMenu ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Can I='interact' a='Post'>
      {allowed => (
        <Menu
          isDisabled={allowed === false}
          {...rest}
        >
          {children}
        </Menu>)}
    </Can>
  )
}
