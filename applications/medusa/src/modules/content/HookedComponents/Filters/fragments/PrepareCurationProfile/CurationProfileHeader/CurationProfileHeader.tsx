import { useContext } from 'react'
import { FlowContext } from '../../../../../PageLayout/FlowBuilder/FlowBuilder'
import { Center, Flex, Grid, GridItem } from '@chakra-ui/react'
import Icon from '../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { OverdollLogoOutline } from '@//:assets/logos'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import IconButton from '../../../../../../form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { ArrowButtonLeft } from '@//:assets/icons'

interface Props {
  onClose?: () => void
}

export default function CurationProfileHeader (props: Props): JSX.Element {
  const {
    onClose
  } = props

  const { i18n } = useLingui()

  const {
    currentStep,
    previousStep
  } = useContext(FlowContext)

  if (onClose == null) {
    return <></>
  }

  return (
    <Grid h={12} w='100%' templateColumns='1fr 1fr 1fr'>
      <GridItem>
        <Flex align='center' justify='flex-start'>
          {(currentStep === 'audience' || currentStep === 'dateOfBirth')
            ? <></>
            : <IconButton
                icon={<Icon icon={ArrowButtonLeft} w={4} h={4} fill='gray.100' />}
                variant='solid'
                onClick={previousStep}
                size='lg'
                aria-label={i18n._(t`Back`)}
              />}
        </Flex>
      </GridItem>
      <GridItem>
        <Center h='100%'>
          <Icon
            icon={OverdollLogoOutline}
            w={8}
            h={8}
            fill='gray.00'
          />
        </Center>
      </GridItem>
      <GridItem>
        <Flex align='center' justify='flex-end'>
          <CloseButton variant='solid' size='lg' onClick={onClose} />
        </Flex>
      </GridItem>
    </Grid>
  )
}
