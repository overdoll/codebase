import { forwardRef, InputHTMLAttributes } from 'react'
import { useHydrate } from '../../../hydrate'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

const FileInput = forwardRef<HTMLInputElement, Props>(({
  children,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const isHydrated = useHydrate()

  return (
    <input
      {...rest}
      disabled={!isHydrated}
      ref={forwardRef}
      hidden
      type='file'
    />
  )
})

export default FileInput
