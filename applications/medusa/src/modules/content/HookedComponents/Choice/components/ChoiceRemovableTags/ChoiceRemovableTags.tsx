import RemovableTag from '../../../../DataDisplay/RemovableTag/RemovableTag'
import { Choices, Id, UseChoiceReturnRemoveValue } from '../../types'
import { HStackScroll } from '../../../../PageLayout'

interface ChoiceRemovableTagsProps {
  values: Choices<any>
  removeValue: UseChoiceReturnRemoveValue
  titleKey: string
}

export default function ChoiceRemovableTags ({
  values,
  removeValue,
  titleKey
}: ChoiceRemovableTagsProps): JSX.Element {
  const onRemove = (id: Id): void => {
    removeValue(id)
  }

  if (Object.keys(values).length < 1) {
    return <></>
  }

  return (
    <HStackScroll spacing={1}>
      {Object.keys(values).map((item, index) => (
        <RemovableTag
          key={index}
          onRemove={onRemove}
          id={item}
          title={values[item][titleKey]}
        />))}
    </HStackScroll>
  )
}
