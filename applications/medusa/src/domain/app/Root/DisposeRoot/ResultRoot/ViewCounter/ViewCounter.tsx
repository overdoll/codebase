import { createContext, ReactNode, useContext, useReducer, useRef } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import { ViewCounterProviderMutation } from '@//:artifacts/ViewCounterProviderMutation.graphql'
import { useUpdateEffect } from 'usehooks-ts'
import { Timeout } from '@//:types/components'

interface ViewCounterContextProps {
  countView: (postId: string) => void
}

interface ViewCounterProviderProps {
  children: ReactNode
}

interface ReducerState {
  postIds: string[]
}

const defaultValue = {
  countView: () => {
  }
}

const initialState: ReducerState = { postIds: [] }

interface ReducerAction {
  type: 'add' | 'reset' | 'replace'
  value: string | string[]
}

type ReducerFunction = (state: ReducerState, action: ReducerAction) => ReducerState

const reducer: ReducerFunction = (state, action) => {
  switch (action.type) {
    case 'add':
      if (typeof action.value === 'string') {
        return { postIds: [...state.postIds, action.value] }
      } else {
        return { postIds: [...state.postIds, ...action.value] }
      }
    case 'reset':
      return initialState
    case 'replace':
      return { postIds: [...action.value] }
    default:
      throw new Error()
  }
}

const ViewCounterContext = createContext<ViewCounterContextProps>(defaultValue)

const Mutation = graphql`
  mutation ViewCounterProviderMutation($input: ObservePostsInput!) {
    observePosts(input: $input) {
      posts {
        id
      }
    }
  }
`

export function ViewCounterProvider (props: ViewCounterProviderProps): JSX.Element {
  const {
    children
  } = props

  const [commit] = useMutation<ViewCounterProviderMutation>(Mutation)

  const timeoutRef = useRef<Timeout | null>(null)

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  const countView: ViewCounterContextProps['countView'] = (postId) => {
    dispatch({
      type: 'add',
      value: postId
    })
  }

  const values = {
    countView
  }

  const commitViews = (): void => {
    const savePosts = [...state.postIds]

    commit({
      variables: {
        input: {
          postIds: savePosts
        }
      },
      onCompleted () {
        dispatch({
          type: 'reset',
          value: ''
        })
      },
      onError () {
      }
    })
  }

  // commit post ids every 5 seconds, and reset timeout if more post id's are added
  useUpdateEffect(() => {
    if (state.postIds.length < 1) return
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(commitViews, 10000)
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state.postIds])

  return (
    <ViewCounterContext.Provider value={values}>
      {children}
    </ViewCounterContext.Provider>
  )
}

export function useViewCounterContext (): ViewCounterContextProps {
  return useContext(ViewCounterContext)
}
