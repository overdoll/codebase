export default function getUserFromEnvironment (environment) {
  // hacky way to get the current viewer
  const viewerRef = environment
    .getStore()
    .getSource()
    .get('client:root')

  if (viewerRef.viewer) {
    return environment
      .getStore()
      .getSource()
      .get(viewerRef.viewer.__ref)
  }

  return null
}
