/**
 * @flow
 */
import type { Node } from 'react'
import Element
  from '../../../../../../../../client/components/routes/upload/components/steps/tag/components/element/Element'
import { Wrap } from '@chakra-ui/react'

type Props = {
  categories: any,
};

export default function Categories ({ categories }: Props): Node {
  return (
    <Wrap justify='center'>
      {categories.map(item => (
        <Element
          key={item.id}
          selected={false}
          title={item.title}
          thumbnail={item.thumbnail}
        />
      ))}
    </Wrap>
  )
}
