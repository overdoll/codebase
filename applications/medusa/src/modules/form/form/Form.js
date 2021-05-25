/**
 * @flow
 */
import type { Node } from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
  children?: Node,
  instance: {
    handleSubmit: () => void,
  },
  onSubmit: () => void,
};

export default function Form ({ children, instance, onSubmit }: Props): Node {
  return (
    <FormProvider {...instance}>
      <form onSubmit={instance.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
