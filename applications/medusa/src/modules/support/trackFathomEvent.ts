import * as Fathom from 'fathom-client'

type TrackFathomEventReturn = () => void

export default function trackFathomEvent (eventId: string, cents: number): TrackFathomEventReturn {
  const trackingCode: string = process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE as string

  return (): void => {
    if (trackingCode !== '') {
      Fathom.trackGoal(eventId, cents)
    }
  }
}
