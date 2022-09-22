import { ControlContract, ControlExpand } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import { SetCoveredProps } from '../../../../ImageControlContainer'
import {
  ControlContainCoverImageProps
} from '../../../../../ImageWrapper/ControlCoverContainImage/ControlCoverContainImage'
import trackFathomEvent from '../../../../../../../../../../support/trackFathomEvent'

interface Props extends SetCoveredProps, ControlContainCoverImageProps {

}

export default function ImageExpandCover (props: Props): JSX.Element {
  const {
    setCovered,
    isCovered
  } = props

  const onClick = (): void => {
    if (isCovered === false) {
      trackFathomEvent('UYWU5N7B', 1)
    }
    setCovered(x => !x)
  }

  return (
    <MediaButton
      onClick={onClick}
      icon={isCovered === true ? ControlContract : ControlExpand}
    />
  )
}
