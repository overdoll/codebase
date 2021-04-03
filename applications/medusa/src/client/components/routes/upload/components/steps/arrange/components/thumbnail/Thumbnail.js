/**
 * @flow
 */
import type { Node } from 'react';
import LoadingCircle from '@//:modules/assets/graph/progress/LoadingCircle';
import Loading from '@//:modules/assets/loading/Loading';
import ImageSmall from '@//:modules/content/image/ImageSmall';

type Props = {
  thumbnail: any,
  progress: any,
  sx?: any,
};

export default function Thumbnail({ thumbnail, progress, sx }: Props): Node {
  return (
    <div
      sx={{
        height: 'fill',
        ...sx,
      }}
    >
      {thumbnail ? <ImageSmall link={thumbnail} /> : <Loading />}
      {progress ? (
        progress['0'] !== progress['1'] && (
          <div
            sx={{
              position: 'absolute',
              top: 0,
              width: 'fill',
              height: 'fill',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'dimmers.300',
              opacity: '0.9',
            }}
          >
            <LoadingCircle
              size={75}
              strokeWidth={6}
              color={'teal.500'}
              min={progress['0']}
              max={progress['1']}
            />
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
