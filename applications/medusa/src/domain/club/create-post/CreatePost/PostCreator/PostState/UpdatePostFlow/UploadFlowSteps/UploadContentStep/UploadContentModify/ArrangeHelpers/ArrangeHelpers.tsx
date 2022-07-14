type ArrangeIndexType = number

interface ResultType {
  destination?: {
    index: number
  }
  source: {
    index: number
  }
}

export function arrangeList (
  list,
  startIndex: ArrangeIndexType,
  endIndex: ArrangeIndexType
): typeof list {
  const arrangedList = Array.from(list)
  const [removed] = arrangedList.splice(startIndex, 1)
  arrangedList.splice(endIndex, 0, removed)

  return arrangedList
}

export function onArrange (
  result: ResultType,
  content
): typeof content {
  // dropped outside the list
  if (result?.destination == null) {
    return content
  }

  return arrangeList(
    content,
    result.source.index,
    result.destination.index
  )
}

export function onArrangeUp (
  index: ArrangeIndexType,
  content):
  typeof content {
  return onArrange({
    source: {
      index: index
    },
    destination: {
      index: index - 1
    }
  },
  content)
}

export function onArrangeDown (
  index: ArrangeIndexType,
  content):
  typeof content {
  return onArrange({
    source: {
      index: index
    },
    destination: {
      index: index + 1
    }
  },
  content)
}
