import { createContext, ReactNode, useContext } from 'react'

export type UserAgentContextProp = string

interface UserAgentProviderProps {
  children: ReactNode
  userAgent: UserAgentContextProp
}

export const UserAgentContext = createContext<UserAgentContextProp>('')

export function UserAgentProvider (props: UserAgentProviderProps): JSX.Element {
  const {
    children,
    userAgent
  } = props

  return (
    <UserAgentContext.Provider value={userAgent}>
      {children}
    </UserAgentContext.Provider>
  )
}

export function useUserAgentContext (): UserAgentContextProp {
  return useContext(UserAgentContext)
}
