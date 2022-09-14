import { DESCRIPTION_FEATURES, DESCRIPTION_PREFIX, TITLE_FEATURES, TITLE_SUFFIX } from '../constants/rich-objects'

export const getCharacterNames = (characters: string[]): string => {
  if (characters.length === 1) {
    return characters[0]
  }
  return characters.join(', ')
}

export const getPostTitle = (characters: string[], club: string): string => {
  return `${getCharacterNames(characters)} From ${club}'s ${TITLE_FEATURES} - ${TITLE_SUFFIX}`
}

export const getPostDescription = (characters: string[], club: string): string => {
  return `${DESCRIPTION_PREFIX} ${getCharacterNames(characters)} ${DESCRIPTION_FEATURES} by ${club} on ${TITLE_SUFFIX}`
}
