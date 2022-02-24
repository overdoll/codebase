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

interface Tags {
  kind: 'Tags'
}

type Abilities = ['create' | 'moderate' | 'interact', InferSubjects<Post> | InferSubjects<Club>] |
['configure', InferSubjects<Account> | InferSubjects<Club>] |
['admin', InferSubjects<Account> | InferSubjects<Tags> | InferSubjects<Club> | InferSubjects<Post>]

export type AppAbility = Ability<Abilities>
export const App = Ability as AbilityClass<AppAbility>

export interface Authenticated {
  isModerator: boolean
  isLocked: boolean
  isStaff: boolean
}
