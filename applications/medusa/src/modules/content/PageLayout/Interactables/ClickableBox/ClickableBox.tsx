import Button from '@//:modules/form/Button'

interface Props {
  children: string
}

export default function ClickableBox ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <Button
      w='100%'
      h='fill'
      size='sm'
      p={2}
      fontFamily='body'
      fontWeight='normal'
      textAlign='left'
      variant='panel'
      {...rest}
    >
      {children}
    </Button>
  )
}
