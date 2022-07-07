import { Flex, Progress, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '../../../../../PageLayout'
import { RemoveCross } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import Button from '../../../../../../form/Button/Button'
import GenericFilePicker from '../../GenericFilePicker/GenericFilePicker'
import { DisplayProps, FileInputFormProps } from '../SingleFileImageUpload'
import { UppyType } from '../../../types'

interface Props extends DisplayProps, FileInputFormProps {
  uppy: UppyType
}

export default function DisplaySingleFileImageUpload ({
  uppy,
  file,
  response,
  isInvalid,
  removeUpload,
  isLoading,
  progress
}: Props): JSX.Element {
  if (file == null) {
    return (
      <GenericFilePicker uppy={uppy} />
    )
  }

  if (response != null) {
    return (
      <Stack w='100%' spacing={2}>
        <Button
          colorScheme={isInvalid ? 'orange' : 'gray'}
          leftIcon={(
            <Icon
              w={4}
              h={4}
              icon={RemoveCross}
              fill={isInvalid ? 'orange.900' : 'gray.100'}
            />)}
          onClick={removeUpload}
          w='100%'
          isLoading={isLoading}
        >
          <Trans>
            Remove Upload
          </Trans>
        </Button>
      </Stack>
    )
  }

  return (
    <LargeBackgroundBox h={16} w='100%'>
      <Flex align='center' justify='space-between'>
        {progress != null
          ? (
            <Progress
              colorScheme='primary'
              w='100%'
              value={((progress ?? 0) * 100)}
              size='lg'
              mr={4}
            />)
          : (
            <Progress
              colorScheme='primary'
              w='100%'
              value={100}
              size='lg'
              hasStripe
              isAnimated
              mr={4}
            />)}
        <CloseButton size='sm' isDisabled={isLoading} onClick={removeUpload} />
      </Flex>
    </LargeBackgroundBox>
  )
}
