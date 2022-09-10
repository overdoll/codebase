interface GetPostSeedProps {
  seed: string | null
}

export default function getPostSeed (ctx): GetPostSeedProps {
  const postSeed = ctx.cookies.get('postSeed')
  const time = `${Date.now()}`

  return {
    seed: postSeed ?? time
  }
}
