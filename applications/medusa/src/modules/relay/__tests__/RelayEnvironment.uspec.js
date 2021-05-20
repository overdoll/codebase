import { fetchRelay, subscribe } from '@//:modules/relay/RelayEnvironment'
import axios from 'axios'
import { Observable } from 'relay-runtime'

jest.mock('axios')

it('should fetch data when called', async () => {
  axios.post.mockResolvedValue({
    data: 'test'
  })

  const fetch = await fetchRelay({ name: 'test', id: 12354 }, { test: 'test' })

  expect(fetch).toEqual('test')
})

it('should throw an error if errors in payload', async () => {
  axios.post.mockResolvedValue({
    data: {
      errors: []
    }
  })

  await expect(
    fetchRelay({ name: 'test', id: 12354 }, { test: 'test' })
  ).rejects.toThrow()
})

it('should subscribe', async () => {
  const sub = subscribe({ name: 'test', id: 12354 }, { test: 'test' })

  expect(sub).toBeInstanceOf(Observable)
})
