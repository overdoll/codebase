import { Ability, AbilityClass, InferSubjects } from '@casl/ability'

interface Post {
  kind: 'Post'
}

interface Account {
  kind: 'Account'
}

type Abilities = ['create' | 'moderate', InferSubjects<Post>] | ['manage', InferSubjects<Account>]

export type AppAbility = Ability<Abilities>
export const App = Ability as AbilityClass<AppAbility>

export interface Authenticated {
  isModerator: boolean
  isLocked: boolean
  isStaff: boolean
}