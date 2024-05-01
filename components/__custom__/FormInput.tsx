import { AlertCircleIcon } from 'lucide-react-native';
import { Controller, Message } from 'react-hook-form';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText
} from '../form-control';
import { Input, InputField, InputIcon, InputSlot } from '../input';
import { ComponentProps } from 'react';

interface FormInputProps {
  placeholder: string;
  control: any;
  errorMessage?: Message;
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  inputIcon?: any;
  name: string;
  type?: ComponentProps<typeof InputField>['type'];
  multiline?: boolean;
}

export function FormInput({
  placeholder,
  control,
  errorMessage,
  label,
  isRequired = false,
  isDisabled = false,
  inputIcon,
  name,
  type = 'text',
  multiline = false
}: FormInputProps) {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!errorMessage}
      size={'lg'}
      isDisabled={isDisabled}
    >
      {label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input>
            {inputIcon && (
              <InputSlot pl="$4">
                <InputIcon as={inputIcon} />
              </InputSlot>
            )}
            <InputField
            flex={1}
              type={type}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline={multiline}
            />
          </Input>
        )}
      />

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
