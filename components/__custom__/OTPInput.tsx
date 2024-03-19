import { Input, InputField } from '@/components';
import React from 'react';

import { useRef, useState } from 'react';
import { HStack } from '../hstack';
import { Platform } from 'react-native';
interface OTPInputProps {
  codeLength: number;
  onCodeFilled: (code: string) => void;
}
export function OTPInput({ codeLength, onCodeFilled }: OTPInputProps) {
  const [code, setCode] = useState(Array(codeLength).fill(''));
  const textInputRefs = useRef(Array(codeLength).fill(null));

  const handleOnChange = (index, text) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus on next input
    if (text && index < codeLength - 1) {
      textInputRefs.current[index + 1].focus();
    }

    // Call the callback when all inputs are filled
    if (newCode.every((digit) => digit !== '')) {
      onCodeFilled(newCode.join(''));
    }
  };

  const handleRemove = (index) => {
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);

    // Auto-focus on previous input
    if (index > 0) {
      textInputRefs.current[index - 1].focus();
    }
  };

  return (
    <HStack gap={'$2'}>
      {Array(codeLength)
        .fill('')
        .map((_, index) => (
          <Input
            flex={1}
            aspectRatio={1}
            key={index}
            size={'sm'}
            isInvalid={false}
            isDisabled={false}
            backgroundColor="$backgroundLight100"
            borderWidth={0}
          >
            <InputField
              textAlign="center"
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'number-pad'
              }
              size={'2xl'}
              maxLength={1}
              ref={(ref) => (textInputRefs.current[index] = ref)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleRemove(index);
                }
              }}
              onChange={(e: any) => {
                const text = e.nativeEvent.text;
                handleOnChange(index, text);
              }}
              value={code[index]}
            />
          </Input>
        ))}
    </HStack>
  );
}
