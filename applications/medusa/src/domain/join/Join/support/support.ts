export const invalidateToken = (store): void => {
  const token = store.getRoot().getLinkedRecord('viewAuthenticationToken')
  if (token != null) {
    token.invalidateRecord()
    store.delete(token.getValue('id'))
  }
}

export const invalidateViewer = (store): void => {
  const viewer = store
    .getRoot()
    .getLinkedRecord('viewer')

  viewer.invalidateRecord()
  store.delete(viewer.getValue('id'))
}

export const setViewer = (store, payload): void => {
  const root = store.getRoot()

  root.setLinkedRecord(payload, 'viewer')
}

export const prepareViewer = (store, payload): void => {
  const viewer = store
    .getRoot()
    .getLinkedRecord('viewer')

  // Link the viewer to the payload so ability can run without refresh
  if (viewer !== null) {
    invalidateViewer(store)
  } else {
    setViewer(store, payload)
  }

  // Invalidate token so when user logs out they don't see the old authentication pages
  invalidateToken(store)
}
