import { ComponentProps, useState } from 'react';
import RNDatePicker from 'react-native-date-picker';
import { Button, ButtonText } from '../button';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  title: string;
  config?: Omit<
    ComponentProps<typeof RNDatePicker>,
    'modal' | 'open' | 'date' | 'onConfirm' | 'onCancel'
  >;
}

export function DatePicker({
  date = new Date(),
  setDate,
  title,
  config
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <ButtonText>
          {title}: {date.toDateString()}
        </ButtonText>
      </Button>
      <RNDatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        {...config}
      />
    </>
  );
}
