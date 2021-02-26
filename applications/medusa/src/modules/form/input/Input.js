/**
 * @flow
 */
import type { Node } from 'react';
import { Input as ThemeUIInput, Text as ThemeUIText } from 'theme-ui';
import { useFormContext } from 'react-hook-form';
import Icon from '@//:modules/content/icon/Icon';
import {
  Alerts,
  FormValidation,
} from '@streamlinehq/streamline-regular/lib/interface-essential';

type Props = {
  validation?: any,
  title: string,
  name: string,
  sx?: any,
};

export default function Input({ sx, validation, title, name, ...rest }: Props): Node {
  const { register, errors, formState } = useFormContext();

  const hasError = errors[name] !== null && errors[name] !== undefined;
  const success = formState.isDirty && !hasError && formState.isSubmitted;

  return (
    <div>
      <div sx={{ position: 'relative' }}>
        <span
          sx={{
            fontWeight: 'heading',
            color: !success
              ? hasError
                ? 'orange.500'
                : 'neutral.200'
              : 'green.600',
            fontFamily: 'body',
            position: 'absolute',
            fontSize: 0,
            pl: 3,
            pt: 0,
          }}
        >
          {title}
        </span>
        <ThemeUIInput
          {...rest}
          name={name}
          ref={register(validation)}
          sx={{
            pl: 3,
            pr: 5,
            fontSize: 2,
            pt: 3,
            pb: 1,
            fontWeight: 'body',
            fontFamily: 'body',
            borderRadius: 'defaults',
            borderColor: hasError ? 'orange.300' : 'neutral.800',
            variant: 'forms.input.primary',
            borderWidth: '2px',
            borderStyle: 'solid',
            outlineWidth: '0',
          }}
        />
        {(hasError || success) && (
          <Icon
            icon={success ? FormValidation.CheckDouble1 : Alerts.AlertCircle}
            stroke={success ? 'green.600' : 'orange.500'}
            sx={{
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              display: 'inline-block',
              right: 2,
              bottom: 0,
            }}
          />
        )}
      </div>
      <ThemeUIText
        sx={{
          color: 'orange.300',
          fontFamily: 'body',
          fontSize: 1,
          pl: 3,
        }}
      >
        {errors[name]?.message}
      </ThemeUIText>
    </div>
  );
}
