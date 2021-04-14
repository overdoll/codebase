/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  alt?: any,
  title?: any,
  icon: any,
};

export default function Icon({ title, alt, icon, ...rest }: Props): Node {
  return <img alt={alt} data-testid={title} src={icon} {...rest} />;
}
