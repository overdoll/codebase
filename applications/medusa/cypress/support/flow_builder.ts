import { clickOnButton } from './user_actions'

export const gotoNextStep = (): void => {
  clickOnButton('Next')
}

export const gotoPreviousStep = (): void => {
  clickOnButton('Back')
}

export const skipCurrentStep = (): void => {
  clickOnButton('Skip')
}

export const saveCurrentStep = (): void => {
  clickOnButton('Save')
}
