import { ControlContract, ControlExpand } from '@//:assets/icons'
import MediaButton from '../../../../../../MediaControls/MediaButton/MediaButton'
import { SetCoveredProps } from '../../../../ImageControlContainer'
import { useState } from 'react'

interface Props extends SetCoveredProps {

}

export default function ImageExpandCover (props: Props): JSX.Element {
  const {
    setCovered
  } = props

  const [isCovered, setIsCovered] = useState(false)

  const onClick = (): void => {
    setCovered(x => {
      setIsCovered(!x)
      return !x
    })
  }

  return (
    <MediaButton
      onClick={onClick}
      icon={isCovered ? ControlContract : ControlExpand}
    />
  )
}
