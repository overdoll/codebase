import { IPlayerOptions } from 'xgplayer'

export interface VideoContainerProps {
  onPlayerInit: (player) => void
}

export interface PlayerOptions {
  volume: number
}

export type PlayerType = IPlayerOptions
