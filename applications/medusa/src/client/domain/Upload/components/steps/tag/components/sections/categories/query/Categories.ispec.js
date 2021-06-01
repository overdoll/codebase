import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import CategoriesQuery from '@//:artifacts/CategoriesQuery.graphql'
import withProviders from '@//:modules/testing/withProviders'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Categories from './Categories'

it('should render categories when data is available', async () => {
  const Environment = createMockEnvironment()

  const variables = { data: { search: '' } }

  Environment.mock.queuePendingOperation(CategoriesQuery, variables)

  const resolver = {
    Category: (context, generateId) => ({
      id: `category-${generateId()}`,
      title: 'test',
      thumbnail: null
    })
  }

  // Set query to return our "fake" data
  Environment.mock.queueOperationResolver(operation =>
    MockPayloadGenerator.generate(operation, resolver)
  )

  const onSelect = jest.fn()

  const CategoryComponent = () => {
    return (
      <Categories
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    )
  }

  const [Root] = withProviders({
    Component: CategoryComponent,
    environment: Environment
  })

  render(<Root />)

  const button = screen.getByRole('button')

  // expect that we are rendering artists correctly
  expect(screen.getByText('test')).toBeVisible()

  // click on the button to add an existing artist
  userEvent.click(button)

  // expect that the request went through
  expect(onSelect).toHaveBeenLastCalledWith({
    id: 'category-1',
    title: 'test',
    thumbnail: null
  })
})

it('should show that there are no categories available', async () => {
  const Environment = createMockEnvironment()

  const categoryName = 'category-example-name'

  const variables = { data: { search: categoryName } }

  Environment.mock.queuePendingOperation(CategoriesQuery, variables)

  Environment.mock.queueOperationResolver(operation => ({
    data: {
      categories: []
    }
  }))

  const onSelect = jest.fn()

  const CategoryComponent = () => {
    return (
      <Categories
        selected={[]}
        onSelect={onSelect}
        args={{ variables, options: {} }}
      />
    )
  }

  const [Root] = withProviders({
    Component: CategoryComponent,
    environment: Environment
  })

  render(<Root />)

  expect(screen.getByText('tag.category.not_found')).toBeVisible()
})
