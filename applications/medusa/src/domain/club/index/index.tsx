const Index = (): any => {
  return null
}

Index.getMiddleware = (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: `/${ctx.query.slug as string}`
    }
  }
}

export default Index
