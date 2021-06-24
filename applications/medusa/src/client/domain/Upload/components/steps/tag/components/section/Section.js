/**
 * @flow
 */
import type { Node } from 'react'
import Search from '../search/Search'
import Icon from '@//:modules/content/icon/Icon'
import {
  Heading, Flex, Wrap, useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@chakra-ui/react'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import ArrowUp1 from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-up-1.svg'
import ArrowDown1 from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-down-1.svg'
import AddCircle1 from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/remove-add/add-circle-1.svg'
import Button from '@//:modules/form/button'
import { useTranslation } from 'react-i18next'

type Props = {
  children: Node,
  search: () => void,
  title: string,
  count: number,
  searchTitle?: string,
};

export default function Section ({
  children,
  search,
  title,
  count,
  searchTitle
}: Props): Node {
  const {
    isOpen: openSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch
  } = useDisclosure()

  const [t] = useTranslation('general')

  return (
    <>
      <AccordionItem p={2} borderRadius={10} bg='gray.800' flexDirection='column' border='hidden'>
        {({ isExpanded }) => (
          <>
            <AccordionButton borderRadius={10}>
              <Flex w='20%' align='center'>
                <Icon icon={SignBadgeCircle} color='gray.50' w={12} h={12} />
                <Heading fontSize='xl' position='absolute' align='center' w={12}>
                  {count}
                </Heading>
              </Flex>
              <Flex w='60%' align='center'>
                <Heading fontSize='xl'>{title}</Heading>
              </Flex>
              <Flex w='20%' justify='flex-end'>
                <Icon w={8} h={8} icon={isExpanded ? ArrowUp1 : ArrowDown1} fill='gray.50' />
              </Flex>
            </AccordionButton>
            <AccordionPanel align='center' direction='row' border='hidden'>
              <Wrap m={2}>{children}</Wrap>
              <Button
                size='md'
                type='buttons.tertiary.alternate'
                onClick={onOpenSearch}
                leftIcon={<Icon w={6} h={6} icon={AddCircle1} fill='gray.50' />}
              >
                {t('button.add')}
              </Button>

            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <Search isOpen={openSearch} onClose={onCloseSearch} header={searchTitle} placeholder={searchTitle}>
        {args => search(args, onCloseSearch)}
      </Search>
    </>
  )
}
