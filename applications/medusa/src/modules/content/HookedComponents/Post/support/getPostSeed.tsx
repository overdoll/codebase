interface GetPostSeedProps {
  seed: string | null
}

export default function getPostSeed (ctx): GetPostSeedProps {
  const postSeed = ctx.cookies.get('od.local.postSeed')

  return {
    seed: postSeed
  }
}
