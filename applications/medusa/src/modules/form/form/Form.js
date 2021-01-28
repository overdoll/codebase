import { FormProvider } from 'react-hook-form';

const Form = ({ children, instance, onSubmit }) => {
  return (
    <FormProvider {...instance}>
      <form onSubmit={instance.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
