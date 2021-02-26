/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  icon: any,
  fill?: any,
  width?: number,
  height?: number,
  size?: any,
  stroke?: any,
};

const renderPaths = (icon, fill, stroke) =>
  icon[4].map((path, index) => (
    <path
      sx={{
        fill: fill || icon[3][index].fill,
        stroke: stroke || icon[3][index].stroke,
      }}
      strokeLinecap={icon[3][index]['stroke-linecap']}
      strokeLinejoin={icon[3][index]['stroke-linejoin']}
      strokeWidth={icon[3][index]['stroke-width']}
      key={path}
      d={path}
    />
  ));

export default function Icon({ width, icon, fill, stroke, height, size, ...rest }: Props): Node {
  let shouldResize = true;

  let finalWidth: number = icon[1];
  let finalHeight: number = icon[2];

  if (size) {
    shouldResize = size !== finalWidth;
    finalWidth = size;
    finalHeight = size;
  } else {
    if (height && height !== finalHeight) {
      finalHeight = height;
      shouldResize = true;
    }

    if (width && width !== finalWidth) {
      finalWidth = width;
      shouldResize = true;
    }
  }

  return (
    <i {...rest}>
      <svg
        viewBox={`0 0 ${finalWidth} ${finalHeight}`}
        style={{ width: finalWidth, height: finalHeight }}
        width={finalWidth}
        height={finalHeight}
      >
        {shouldResize ? (
          <g
            transform={`scale(${finalWidth / icon[1]},${finalHeight /
              icon[2]})`}
          >
            {renderPaths(icon, fill, stroke)}
          </g>
        ) : (
          renderPaths(icon, fill, stroke)
        )}
      </svg>
    </i>
  );
}
