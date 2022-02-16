import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import { ChoiceAnyValues, Choices, Id, UseChoiceReturnRemoveValue } from '../../types'
import { Box } from '@chakra-ui/react'

interface TagProps extends ChoiceAnyValues {
  tagTitle: string
}

interface ChoiceRemovableTagsProps {
  values: Choices<TagProps>
  removeValue: UseChoiceReturnRemoveValue
}

export default function ChoiceRemovableTags ({
  values,
  removeValue
}: ChoiceRemovableTagsProps): JSX.Element {
  const onRemove = (id: Id): void => {
    removeValue(id)
  }

  return (
    <Box>
      {Object.keys(values).map((item, index) => (
        <RemovableTag
          key={index}
          onRemove={onRemove}
          id={item}
          title={values[item].tagTitle}
        />))}
    </Box>
  )
}
