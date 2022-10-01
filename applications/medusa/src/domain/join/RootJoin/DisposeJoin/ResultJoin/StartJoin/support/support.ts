export const invalidateToken = (store): void => {
  const token = store.getRoot().getLinkedRecord('viewAuthenticationToken')
  if (token != null) {
    token.invalidateRecord()
  }
}

export const invalidateViewer = (store): void => {
  const viewer = store
    .getRoot()
    .getLinkedRecord('viewer')

  if (viewer != null) {
    viewer.invalidateRecord()
  }
}

export const setViewer = (store, payload): void => {
  const viewer = store.getRoot().getOrCreateLinkedRecord('viewer', 'Account')

  // TODO this makes the viewer initially null and causes a flicker in the UI. find a way to handle it better?
  // if you use setLinkedRecord and the authenticationToken gets invalidated, the viewer goes from being updated to null
  // because setLinkedRecord only creates a link between the record and does not copy over the values
  if (viewer == null && payload != null) {
    viewer.copyFieldsFrom(payload)
  }
}
