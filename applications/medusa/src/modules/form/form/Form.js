/**
 * @flow
 */
import type { Node } from 'react';
import { FormProvider } from 'react-hook-form';

type Props = {
  children?: Node,
  instance: any,
  onSubmit: any,
};

export default function Form(props: Props): Node {
  const { children, instance, onSubmit } = props;

  return (
    <FormProvider {...instance}>
      <form onSubmit={instance.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
