import { ControlContract, ControlExpand } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import { SetCoveredProps } from '../../../../ImageControlContainer'
import {
  ControlContainCoverImageProps
} from '../../../../../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'

interface Props extends SetCoveredProps, ControlContainCoverImageProps {

}

export default function ImageExpandCover (props: Props): JSX.Element {
  const {
    setCovered,
    isCovered
  } = props

  const onClick = (): void => {
    setCovered(x => !x)
  }

  return (
    <MediaButton
      onClick={onClick}
      icon={isCovered === true ? ControlContract : ControlExpand}
    />
  )
}
