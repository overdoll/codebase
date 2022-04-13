import { fetchRelay } from '../index'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

it('should fetch data when called', async () => {
  mockedAxios.post.mockResolvedValue({
    data: 'test'
  })

  const fetch = await fetchRelay({
    name: 'test',
    id: 12354
  }, { test: 'test' })

  expect(fetch).toEqual('test')
})

it('should throw an error if errors in payload', async () => {
  mockedAxios.post.mockResolvedValue({
    data: {
      errors: []
    }
  })

  await expect(
    fetchRelay({
      name: 'test',
      id: 12354
    }, { test: 'test' })
  ).rejects.toThrow()
})
