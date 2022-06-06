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
  const root = store.getRoot()

  if (root != null && payload != null) {
    root.setLinkedRecord(payload, 'viewer')
  }
}
