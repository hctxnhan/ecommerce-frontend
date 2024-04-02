import {
  Input,
  InputField,
  InputSlot,
  Text
} from '@/components';
import { useCartStore } from '@/configs/store/Cart.store';

export function VoucherInput() {
  const setVoucher = useCartStore.use.setVoucher();
  const voucher = useCartStore.use.voucher();

  return (
    <Input borderWidth={0} m={0} p={0}>
      <InputSlot>
        <Text
          fontWeight='bold'
          textTransform='uppercase'
          color='$text200'
        >Voucher</Text>
      </InputSlot>
      <InputField
        m={0}
        fontSize={'$2xl'}
        fontWeight="bold"
        placeholder="Enter voucher code"
        value={voucher?.toUpperCase() || ''}
        onChangeText={(value) => setVoucher(value.toUpperCase())}
      />
    </Input>
  );
}
