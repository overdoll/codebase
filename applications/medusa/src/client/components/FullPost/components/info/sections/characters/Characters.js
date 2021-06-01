/**
 * @flow
 */
import type { Node } from 'react'
import Element
  from '../../../../../../domain/Upload/components/steps/tag/components/element/Element'
import { Wrap } from '@chakra-ui/react'

type Props = {
  characters: any,
};

export default function Characters ({ characters }: Props): Node {
  return (
    <Wrap justify='center'>
      {characters.map(item => (
        <Element
          key={item.id}
          selected={false}
          title={item.name}
          subheader={item.media.title}
          thumbnail={item.thumbnail}
        />
      ))}
    </Wrap>
  )
}
