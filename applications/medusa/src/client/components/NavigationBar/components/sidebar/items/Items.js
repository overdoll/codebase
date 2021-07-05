/**
 * @flow
 */
import {
  Accordion,
  AccordionButton,
  AccordionItem, AccordionPanel,
  Button,
  Heading, Text, Stack
} from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'

type Props = {
  items: Node,
  location: string,
}

export default function Items ({ items, location }: Props): Node {
  const [t] = useTranslation('nav')

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple allowToggle borderTop='transparent' borderBottom='transparent'>
        <Stack spacing={2}>
          {items?.map((item, index) => (
            <Fragment key={index}>
              {item.routes
                ? <AccordionItem borderTop='transparent' borderBottom='transparent'>
                  <AccordionButton borderRadius={10}>
                    <Link to={item.firstRoute ? undefined : item.route}>
                      <Text>{t(item.title)}</Text>
                    </Link>
                  </AccordionButton>
                  <AccordionPanel>
                    <Items items={item.routes} />
                  </AccordionPanel>
                </AccordionItem>
                : <Link to={item.route}>
                  <Button
                    borderRadius={5} pt={3} pb={3}
                    textAlign='left' w='100%'
                    bg={location === item.route ? 'gray.700' : 'transparent'}
                    variant='solid'
                  >
                    <Heading
                      color={location === item.route ? 'gray.100' : 'gray.300'} size='sm' w='100%'
                      textAlign='left'
                    >
                      {t(item?.title)}
                    </Heading>
                  </Button>
                </Link>}
            </Fragment>
          ))}
        </Stack>
      </Accordion>
    </>
  )
}
