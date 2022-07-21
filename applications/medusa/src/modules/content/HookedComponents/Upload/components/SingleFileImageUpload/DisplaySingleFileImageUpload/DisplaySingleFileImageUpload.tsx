import GenericFilePicker from '../../GenericFilePicker/GenericFilePicker'
import { DisplayProps, FileInputFormProps } from '../SingleFileImageUpload'
import { UppyType } from '../../../types'
import UploadFileDisplay from '../../UploadFileDisplay/UploadFileDisplay'

interface Props extends DisplayProps, FileInputFormProps {
  uppy: UppyType
}

export default function DisplaySingleFileImageUpload ({
  uppy,
  file,
  isLoading
}: Props): JSX.Element {
  if (file == null) {
    return (
      <GenericFilePicker uppy={uppy} />
    )
  }

  return (
    <UploadFileDisplay isDisabled={isLoading} file={file} uppy={uppy} />
  )
}
