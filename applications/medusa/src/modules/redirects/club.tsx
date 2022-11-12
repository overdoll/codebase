const ClubRedirect = (data): any => {
  if (data.clubHomeQuery.response.data.club == null) {
    return {}
  }

  const rootData = data.rootQuery.response.data
  const clubData = data.clubHomeQuery.response.data.club

  const redirect = {
    redirect: {
      permanent: false,
      destination: `/${clubData.slug as string}`
    }
  }

  if (rootData.viewer == null) {
    return redirect
  }

  if (rootData.isStaff === false) {
    return redirect
  }

  if (clubData.isOwner === true) {
    return {}
  }

  return redirect
}

export default ClubRedirect
