import type Player from 'xgplayer'

export interface VideoContainerProps {
  onPlayerInit: (player) => void
}

export interface PlayerOptions {
  volume: number
}

// @ts-expect-error
export class PlayerType extends Player {
  public video: HTMLVideoElement
}

export type OnPlayerInitType = (player: PlayerType) => void

export interface ColorType {
  rgb?: {
    red: number
    green: number
    blue: number
  } | string
}
