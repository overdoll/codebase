/**
 * @flow
 */
import type { Node } from 'react'
import type { VariablesOf } from 'react-relay/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { MediaQuery } from '@//:artifacts/MediaQuery.graphql'
import Element from '../../../../../../../../../components/Element/Element'
import { Wrap } from '@chakra-ui/react'
import Empty from '../../../search/empty/Empty'
import { useTranslation } from 'react-i18next'

type Props = {
  args: {
    variables: VariablesOf<MediaQuery>,
    options: {},
  },
  onSelect: () => void,
};

const MediaQueryGQL = graphql`
  query MediaQuery($data: SearchInput!) {
    media(data: $data) {
      id
      title
      thumbnail
    }
  }
`

export default function Media ({ args, onSelect }: Props): Node {
  const [t] = useTranslation('upload')

  const data = useLazyLoadQuery<MediaQuery>(
    MediaQueryGQL,
    args.variables,
    args.options
  )

  // add a new media with a custom tag telling us it's custom
  const onAddNewMedia = () => {
    const name: string = args.variables.data.search
    onSelect({ id: name, title: name, thumbnail: null, request: true })
  }

  return (
    <>
      {data.media.length === 0
        ? (
          <Empty
            title={t('tag.character.media.not_found')}
            button={`${t('tag.character.media.add')} ${args.variables.data.search}`} onClick={onAddNewMedia}
          />
          )
        : (
          <Wrap justify='center'>
            {data.media.map(item => (
              <Element
                key={item.id}
                onSelect={() => onSelect(item)}
                selected={false}
                title={item.title}
                thumbnail={item.thumbnail}
              />
            ))}
          </Wrap>
          )}
    </>
  )
}
