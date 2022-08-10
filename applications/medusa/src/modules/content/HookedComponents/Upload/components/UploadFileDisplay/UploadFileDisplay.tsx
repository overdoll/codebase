import { UppyFile } from '@uppy/core'
import { Heading, HStack, Progress, ProgressProps, Stack, Text } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { FileErrorType, UppyType } from '../../types'
import { ArrowButtonRefresh, CheckCircle, DownloadArrow, UploadFile, WarningTriangle } from '@//:assets/icons'
import IconButton from '../../../../../form/IconButton/IconButton'
import { FILE_ICONS } from '../../constants/upload'
import { useMemo } from 'react'
import { useDebounce } from 'usehooks-ts'

interface Props {
  file: UppyFile
  uppy: UppyType
  error?: FileErrorType
  isDisabled?: boolean
}

export default function UploadFileDisplay ({
  file,
  uppy,
  error,
  isDisabled
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const fileHasError = error != null

  const fileUploadComplete = file.progress?.uploadComplete === true

  const fileUploadStarted = file.progress?.uploadStarted != null && file?.progress?.percentage != null

  const debouncedPercentage = useDebounce(file?.progress?.percentage, 100)

  const onRemoveFile = (): void => {
    uppy.removeFile(file.id)
  }

  const onRetryFile = (): void => {
    void uppy.retryUpload(file.id)
  }

  const FileIcon = (): JSX.Element => {
    const ICON_PROPS = {
      w: 6,
      h: 6
    }

    if (fileHasError) {
      return <Icon icon={WarningTriangle} {...ICON_PROPS} fill='orange.300' />
    }

    if (fileUploadComplete) {
      return <Icon icon={CheckCircle} {...ICON_PROPS} fill='green.300' />
    }

    if (fileUploadStarted) {
      return <Icon icon={UploadFile} {...ICON_PROPS} fill='teal.300' />
    }

    return <Icon icon={DownloadArrow} {...ICON_PROPS} fill='primary.300' />
  }

  const FileProgress = (): JSX.Element => {
    const PROGRESS_PROPS: ProgressProps = {
      w: '100%',
      size: 'md',
      h: 5,
      borderRadius: 'md',
      hasStripe: true
    }

    const memoProgress = useMemo(() => {
      const determineColorScheme = (): string => {
        if (fileHasError) {
          return 'orange'
        }
        if (fileUploadComplete) {
          return 'green'
        }

        return 'teal'
      }

      return (
        <Progress
          colorScheme={determineColorScheme()}
          isAnimated={fileUploadStarted && !fileUploadComplete && !fileHasError}
          value={debouncedPercentage === 0 ? 5 : debouncedPercentage}
          {...PROGRESS_PROPS}
        />
      )
    }, [debouncedPercentage, fileHasError, fileUploadComplete, fileUploadStarted])

    if (fileHasError || fileUploadComplete || fileUploadStarted) {
      return (
        <>
          {memoProgress}
        </>
      )
    }

    return (
      <Progress
        colorScheme='primary'
        value={100}
        hasStripe
        isAnimated
        {...PROGRESS_PROPS}
      />
    )
  }

  const FileOptions = (): JSX.Element => {
    return (
      <HStack spacing={2}>
        {fileHasError && (
          <IconButton
            variant='ghost'
            icon={<Icon icon={ArrowButtonRefresh} w={5} h={5} fill='gray.100' />}
            size='md'
            aria-label={i18n._(t`Retry File`)}
            isDisabled={isDisabled}
            onClick={onRetryFile}
          />
        )}
        <CloseButton
          size='md'
          aria-label={i18n._(t`Remove File`)}
          isDisabled={isDisabled}
          onClick={onRemoveFile}
        />
      </HStack>
    )
  }

  return (
    <LargeBackgroundBox p={3}>
      <Stack spacing={1}>
        {file?.type != null && (
          <HStack align='center' spacing={2}>
            <Icon icon={FILE_ICONS[file.type]} w={4} h={4} fill='gray.200' />
            <Heading noOfLines={1} fontSize='sm' color='gray.200'>
              {'name' in file.data ? file.data?.name : file.id}
            </Heading>
          </HStack>
        )}
        <HStack w='100%' spacing={2} justify='space-between'>
          <HStack w='100%' spacing={3}>
            <FileIcon />
            <FileProgress />
          </HStack>
          <FileOptions />
        </HStack>
        {fileHasError && (
          <Text noOfLines={1} fontSize='sm' color='orange.300'>
            {(error.error?.message)} {error.response}
          </Text>
        )}
      </Stack>
    </LargeBackgroundBox>
  )
}
