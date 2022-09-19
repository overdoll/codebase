import { useCookies } from 'react-cookie'

interface GetPostSeedProps {
  seed: string | null
}

export default function getSeedFromCookie (): GetPostSeedProps {
  const [cookies] = useCookies<string>(['postSeed'])
  const postSeed = cookies.postSeed
  const time = `${Date.now()}`

  return {
    seed: postSeed ?? time
  }
}
