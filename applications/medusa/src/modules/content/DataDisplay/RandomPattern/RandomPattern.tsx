import { OverlappingBubbles, OverlappingCircles, OverlappingPlus } from '@//:assets/icons/patterns'
import IconPattern from '../../PageLayout/Flair/IconPattern/IconPattern'

export default function RandomPattern (): JSX.Element {
  const icons = [
    {
      icon: OverlappingBubbles,
      zoom: 'large'
    },
    {
      icon: OverlappingCircles,
      zoom: 'small'
    },
    {
      icon: OverlappingPlus,
      zoom: 'medium'
    }
  ]

  // TODO center it or position randomly so it doesnt look clipped on right/bottom edge

  const randomIcon = icons[Math.floor(Math.random() * 3)]

  return (
    <IconPattern
      opacity='0.05'
      zoom={randomIcon.zoom}
      icon={randomIcon.icon}
      fill='gray.00'
    />

  )
}
