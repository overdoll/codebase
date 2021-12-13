import { RootQueryResponse } from '@//:artifacts/RootQuery.graphql'

export default function getUserFromEnvironment (environment): RootQueryResponse['viewer'] | null {
  // hacky way to get the current viewer
  const viewerRef = environment
    .getStore()
    .getSource()
    .get('client:root')

  if (viewerRef.viewer != null) {
    return environment
      .getStore()
      .getSource()
      .get(viewerRef.viewer.__ref)
  }

  return null
}
