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
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  inputIcon: any;
  name: string;
  type?: ComponentProps<typeof InputField>['type'];
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
  type = 'text'
}: FormInputProps) {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!errorMessage}
      size={'lg'}
      isDisabled={isDisabled}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: {onBlur, onChange, value} }) => (
          <Input>
            <InputSlot pl="$4">
              <InputIcon as={inputIcon} />
            </InputSlot>
            <InputField type={type} placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
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
