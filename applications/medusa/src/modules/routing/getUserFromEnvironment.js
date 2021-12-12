export default function getUserFromEnvironment (environment) {
  // hacky way to get the current viewer
  const viewerRef = environment
    .getStore()
    .getSource()
    .get(key)

  if (viewerRef.viewer) {
    return environment
      .getStore()
      .getSource()
      .get(key)
  }

  return null
}
