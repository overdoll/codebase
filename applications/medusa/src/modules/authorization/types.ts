import { Ability, AbilityClass, InferSubjects } from '@casl/ability'

interface Post {
  kind: 'Post'
}

interface Account {
  kind: 'Account'
}

interface Club {
  kind: 'Club'
}

interface Tag {
  kind: 'Tag'
}

interface Billing {
  kind: 'Billing'
}

type Abilities = ['create' | 'moderate' | 'interact', InferSubjects<Post> | InferSubjects<Club>] |
['configure', InferSubjects<Account> | InferSubjects<Club>] |
['staff', InferSubjects<Account> | InferSubjects<Tag> | InferSubjects<Club> | InferSubjects<Post> | InferSubjects<Billing>]

export type AppAbility = Ability<Abilities>
export const App = Ability as AbilityClass<AppAbility>

export interface Authenticated {
  isModerator: boolean
  isLocked: boolean
  isStaff: boolean
}
