import { DeliveryAddressForm } from '@/app/home/profile/components/DeliveryAddressForm';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useCartStore } from '@/configs/store/Cart.store';
import { z } from 'zod';

const Schema = z.object({
  address: z.string({
    required_error: 'Address is required'
  }),
  city: z.string({
    required_error: 'City is required'
  }),
  name: z.string({
    required_error: 'Name is required'
  }),
  phone: z.string({
    required_error: 'Phone number is required'
  }),
  isPrimary: z.boolean().optional().default(false)
});

export function EditDeliveryAddress({
  showActionsheet,
  setShowActionsheet
}: {
  showActionsheet: boolean;
  setShowActionsheet: (value: boolean) => void;
}) {
  const setDA = useCartStore.use.setDeliveryAddress();
  const deliveryAddress = useCartStore.use.deliveryAddress();

  function onSubmit(data: z.infer<typeof Schema>) {
    setDA({
      ...data,
      isDefault: false
    });
    setShowActionsheet(false);
  }

  return (
    <Actionsheet isOpen={showActionsheet}>
      <ActionsheetBackdrop
        onPress={() => {
          setShowActionsheet(false);
        }}
        backgroundColor="$backgroundLight500"
      />
      <ActionsheetContent
        p={0}
        backgroundColor="$backgroundLight100"
        borderRadius="$xl"
      >
        <ActionsheetSectionHeaderText>
          Edit delivery address
        </ActionsheetSectionHeaderText>

        <ActionsheetItem w="$full" flexDirection="column">
          <Container w={'$full'} x y>
            <DeliveryAddressForm
              defaultValues={{
                address: deliveryAddress?.address ?? '',
                city: deliveryAddress?.city ?? '',
                name: deliveryAddress?.name ?? '',
                phone: deliveryAddress?.phone ?? '',
                isPrimary: deliveryAddress?.isPrimary ?? false
              }}
              canSetPrimary
              onSubmit={onSubmit}
            />
          </Container>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}
