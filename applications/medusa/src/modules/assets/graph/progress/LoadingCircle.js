/**
 * @flow
 */
import Text from '@//:modules/typography/text/Text';
import { useEffect, useState } from 'react';

type Props = {
  min?: number,
  max?: number,
  size?: number,
  strokeWidth?: number,
  color?: any,
  sx?: any,
};

export default function LoadingCircle({
  min,
  max,
  size,
  strokeWidth,
  color,
  sx,
}: Props): Node {
  const center = size / 2;

  const radius = center - strokeWidth / 2;

  const cfr = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(0);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(((min / max) * 100).toFixed(0));
    setOffset((min / max - 1) * cfr);
  }, [setOffset, cfr, min, max, offset]);

  return (
    <div sx={{ position: 'relative', width: size, height: size, ...sx }}>
      <svg sx={{ width: size, height: size }}>
        <circle
          sx={{ stroke: 'neutral.100' }}
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
          fill={'none'}
        />
        <circle
          sx={{ stroke: color }}
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
          fill={'none'}
          strokeDasharray={cfr}
          strokeDashoffset={offset}
        />
      </svg>
      <span
        sx={{
          position: 'absolute',
          width: 'fill',
          height: 'fill',
          textAlign: 'center',
          left: 0,
          lineHeight: `${size}px`,
        }}
      >
        <Text
          sx={{
            fontSize: 1,
            color: 'neutral.000',
          }}
        >
          {percent}%
        </Text>
      </span>
    </div>
  );
}
