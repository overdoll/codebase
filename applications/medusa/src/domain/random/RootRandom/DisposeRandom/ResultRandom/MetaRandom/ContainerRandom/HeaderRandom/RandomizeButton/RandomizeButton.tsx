import { useQueryParam } from 'use-query-params'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { RandomizeDice } from '@//:assets/icons'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import StickyWrapper from '@//:common/components/StickyWrapper/StickyWrapper'
import { Box, Flex } from '@chakra-ui/react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'

export default function RandomizeButton (): JSX.Element {
  const { i18n } = useLingui()

  const [, setPostSeed] = useQueryParam<string | null | undefined>('seed')

  const seed = `${Date.now()}`

  const onRandomize = (): void => {
    setPostSeed(seed)
  }

  const BUTTON_PROPS = {
    colorScheme: 'orange',
    variant: 'solid'
  }

  return (
    <StickyWrapper>
      {({
        isSticky,
        ref
      }) => (
        <Box
          w='100%'
          position='sticky'
          zIndex='sidebar'
          top={{
            base: -1,
            md: -2
          }}
          pt={isSticky
            ? {
                base: 2,
                md: 66
              }
            : {}}
          ref={ref}
        >
          {!isSticky
            ? (
              <Button
                leftIcon={<Icon w={5} h={5} icon={RandomizeDice} fill='orange.900' />}
                onClick={onRandomize}
                {...BUTTON_PROPS}
                w='100%'
                size='lg'
              >
                <Trans>
                  Randomize!
                </Trans>
              </Button>
              )
            : (
              <Flex w='100%' justify='flex-start'>
                <IconButton
                  onClick={onRandomize}
                  borderRadius='full'
                  icon={<Icon w={7} h={7} icon={RandomizeDice} fill='orange.900' />}
                  {...BUTTON_PROPS}
                  aria-label={i18n._(t`Randomize!`)}
                  w={16}
                  h={16}
                />
              </Flex>
              )}
        </Box>
      )}
    </StickyWrapper>
  )
}
