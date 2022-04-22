export const prepareViewer = (store, payload): void => {
  const root = store.getRoot()

  const viewer = store
    .getRoot()
    .getLinkedRecord('viewer')

  // Link the viewer to the payload so ability can run without refresh
  if (viewer !== null) {
    viewer.invalidateRecord()
  } else {
    root.setLinkedRecord(payload, 'viewer')
  }

  // Invalidate token so when user logs out they don't see the old authenticaton pages
  const token = store.getRoot().getLinkedRecord('viewAuthenticationToken')
  if (token != null) {
    token.invalidateRecord()
  }
}