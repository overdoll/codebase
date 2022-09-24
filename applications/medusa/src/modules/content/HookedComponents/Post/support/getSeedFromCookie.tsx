import { useCookies } from 'react-cookie'

interface GetPostSeedProps {
  seed: string | null
}

export default function getSeedFromCookie (): GetPostSeedProps {
  const [cookies] = useCookies<string>(['od.local.postSeed'])
  const postSeed = cookies['od.local.postSeed']

  return {
    seed: postSeed ?? null
  }
}
