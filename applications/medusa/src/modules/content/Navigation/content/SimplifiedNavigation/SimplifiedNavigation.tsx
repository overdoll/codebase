import { Button, Flex, Spacer } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import Icon from '@//:modules/content/Icon/Icon'
import { useHistory } from '@//:modules/routing'
import { useTranslation } from 'react-i18next'
import { ArrowButtonUndo } from '@//:assets/icons/navigation'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SimplifiedNavigation ({ children }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  const history = useHistory()

  return (
    <>
      <Flex
        align='center'
        right={0}
        left={0}
        top={0}
        h='54px'
      />
      <Flex
        zIndex='docked'
        align='center'
        right={0}
        left={0}
        top={0}
        position='fixed'
        h='54px'
        bg='transparent'
      >
        <Link to='/'>
          <Button ml={2}>{t('title')}</Button>
        </Link>
        <Spacer />
        <IconButton
          onClick={() => history.goBack()}
          variant='solid'
          colorScheme='gray'
          size='md'
          mr={2}
          icon={
            <Icon
              icon={ArrowButtonUndo}
              m={2}
              w='fill'
              h='fill'
              p={1}
              fill='gray.100'
            />
          }
        />
      </Flex>
      {children}
    </>
  )
}
