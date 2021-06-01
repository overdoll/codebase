import withProviders from '@//:modules/testing/withProviders'
import { render, screen, waitFor } from '@testing-library/react'
import Uppy from '@uppy/core'
import userEvent from '@testing-library/user-event'
import Picker from '../Picker'

it('should allow uploading to occur', async () => {
  const select = jest.fn()

  const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })

  const uppy = new Uppy({
    id: 'tests',
    autoProceed: false
  })

  const PickerComponent = () => {
    return <Picker uppy={uppy} onSelect={select} />
  }

  const [Root] = withProviders({
    Component: PickerComponent
  })

  render(<Root />)

  // cant find upload by anything else other than test ID so we use it here
  userEvent.upload(screen.getByTestId('file'), file)

  await waitFor(() => expect(select).toHaveBeenCalled())
})

it('should not allow upload to occur due to bad image format', async () => {
  const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })

  const uppy = new Uppy({
    id: 'tests',
    autoProceed: false,
    restrictions: {
      allowedFileTypes: ['video/mp4']
    }
  })

  const PickerComponent = () => {
    return <Picker uppy={uppy} onSelect={() => {}} />
  }

  const [Root] = withProviders({
    Component: PickerComponent
  })

  render(<Root />)

  // cant find upload by anything else other than test ID so we use it here
  userEvent.upload(screen.getByTestId('file'), file)

  await waitFor(() =>
    expect(
      screen.getByText('You can only upload: video/mp4')
    ).toBeInTheDocument()
  )
})
