import { Text } from '../text';

export function FormFieldError({ errorMessage }: { errorMessage?: string }) {
  return errorMessage ? <Text color="$red500">{errorMessage}</Text> : null;
}
