import { trackGoal } from 'fathom-client'

export default function trackFathomEvent (eventId: string, cents: number): void {
  const trackingCode: string = process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE as string

  const trackFunction = (): void => {
    if (trackingCode !== '') {
      trackGoal(eventId, cents)
    }
  }

  return trackFunction()
}
