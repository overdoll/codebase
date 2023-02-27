const ClubRedirect = (ctx, data): any => {
  if (data.clubHomeQuery == null) {
    return {}
  }

  const redirect = {
    redirect: {
      permanent: false,
      destination: `/${ctx.query.slug as string}`
    }
  }

  const rootData = data.rootQuery.response.data

  if (rootData.viewer == null) {
    return redirect
  }

  if (data.clubHomeQuery.response.data.club == null) {
    return {}
  }

  const clubData = data.clubHomeQuery.response.data.club

  if (clubData.viewerIsOwner === true) {
    return {}
  }

  if (rootData.viewer.isStaff === false) {
    return redirect
  }

  return redirect
}

export default ClubRedirect
