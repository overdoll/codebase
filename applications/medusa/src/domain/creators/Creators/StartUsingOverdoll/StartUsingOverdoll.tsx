import Button from '@//:modules/form/Button/Button'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import React from 'react'
import { keyframes } from '@chakra-ui/react'

const StartUsingOverdoll = ({ onClick }) => {
  const topBubbles = keyframes`
  0%{
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
}
  10% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
  20% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  `

  const bottomBubbles = keyframes`
  0%{
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
}
  10% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
  20% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
}
  `

  return (
    <Button
      onClick={onClick}
      colorScheme='orange'
      size='lg'
      leftIcon={<Icon icon={PremiumStar} w={5} h={5} fill='orange.900' />}
      _before={{
        display: 'block',
        animation: `${topBubbles} ease-in-out 5s forwards infinite`,
        transition: 'all ease-in-out 0.5s',
        top: '-75%',
        position: 'absolute',
        content: '""',
        width: '110%',
        height: '100%',
        zIndex: -1000,
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, transparent 20%, var(--od-colors-orange-300) 20%, transparent 30%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, transparent 10%, var(--od-colors-orange-300) 15%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%)',
        backgroundSize: '10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%'
      }}
      _after={{
        display: 'block',
        animation: `${bottomBubbles} ease-in-out 5s forwards infinite`,
        bottom: '-75%',
        transition: 'all ease-in-out 0.5s',
        position: 'absolute',
        content: '""',
        width: '110%',
        height: '100%',
        zIndex: -1000,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%',
        backgroundImage: 'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle,  transparent 10%, var(--od-colors-orange-300) 15%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%),' +
          'radial-gradient(circle, var(--od-colors-orange-300) 20%, transparent 20%)'
      }}
    >
      <Trans>
        Start using overdoll
      </Trans>
    </Button>
  )
}

export default StartUsingOverdoll
