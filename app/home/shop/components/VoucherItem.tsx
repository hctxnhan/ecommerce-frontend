import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  Text,
  VStack
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useCartStore } from '@/configs/store/Cart.store';
import { Discount, DiscountApplyType, DiscountType } from '@/types';
import * as Clipboard from 'expo-clipboard';
import {
  BadgePercent,
  Calendar,
  CopyCheck,
  CopyIcon,
  DollarSign
} from 'lucide-react-native';
import { useState } from 'react';

interface VoucherItemProps {
  voucher: Discount;
  canCopy?: boolean;
  canApply?: boolean;
}

const discountApplyType = (
  applyType: DiscountApplyType,
  applyValues: string[]
) => {
  switch (applyType) {
    case DiscountApplyType.ALL:
      return 'all products';
    case DiscountApplyType.CATEGORIES:
      return `${applyValues.join(', ')} categories`;
    case DiscountApplyType.BRANDS:
      return `products from ${applyValues.join(', ')} brands`;
    case DiscountApplyType.PRODUCTS:
      return 'specific products';
    default:
      return '';
  }
};

export function VoucherItem({
  voucher,
  canCopy = true,
  canApply = true
}: VoucherItemProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const setVoucher = useCartStore.use.setVoucher();
  const voucherInCart = useCartStore.use.voucher();

  function handleCopy() {
    Clipboard.setStringAsync(voucher.code);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }

  return (
    <Container
      borderWidth={2}
      borderColor="$text200"
      rounded={'$2xl'}
      overflow="hidden"
    >
      {canApply && (
        <Button
          position="absolute"
          top={'$2'}
          right={'$4'}
          size="xs"
          variant="link"
          zIndex={100}
          disabled={voucher.code === voucherInCart}
          onPress={setVoucher.bind(null, voucher.code)}
        >
          <ButtonText
            ml={'$1'}
            color={
              voucher.code === voucherInCart
                ? '$primary200'
                : '$backgroundLight0'
            }
          >
            {voucher.code === voucherInCart ? 'Applied' : 'Apply'}
          </ButtonText>
        </Button>
      )}

      <Container
        x
        y
        borderBottomLeftRadius={'$2xl'}
        borderBottomRightRadius={'$2xl'}
        bg="$primary500"
        gap={'$1'}
      >
        <Text color="$text0" fontWeight="bold">
          {voucher.name}
        </Text>
        <Text color="$text0">{voucher.description}</Text>

        {canCopy && (
          <>
            <Box
              my={'$2'}
              w={'$full'}
              borderTopWidth={2}
              borderStyle="dashed"
              borderColor="$primary400"
            />

            <HStack alignItems="center">
              <Text size="sm" color="$primary100">
                {voucher.code}
              </Text>

              <Button
                ml={'$2'}
                size="xs"
                variant="link"
                zIndex={100}
                onPress={handleCopy}
              >
                <ButtonIcon
                  size="sm"
                  color="$backgroundLight0"
                  as={hasCopied ? CopyCheck : CopyIcon}
                />
                <ButtonText ml={'$1'} color="$backgroundLight0">
                  {hasCopied ? 'Copied' : 'Copy'}
                </ButtonText>
              </Button>
            </HStack>
          </>
        )}
      </Container>

      <Container justifyContent="space-between" gap={'$2'} x y>
        <HStack gap={'$2'}>
          <Box rounded="$2xl" p={'$2'} bg="$backgroundLight100">
            <Icon as={Calendar} size={'xl'} />
          </Box>
          <VStack>
            <Text size="sm" color="$text400">
              Valid till
            </Text>
            <Text color="$text600" fontWeight="$semibold">
              {new Date(voucher.endDate).toDateString()}
            </Text>
          </VStack>
        </HStack>

        <HStack gap={'$2'}>
          <Box rounded="$2xl" p={'$2'} bg="$backgroundLight100">
            <Icon as={DollarSign} size={'xl'} />
          </Box>
          <VStack>
            <Text size="sm" color="$text400">
              Minimum order
            </Text>
            <Text color="$text600" fontWeight="$semibold">
              {voucher.minOrderValue}$
            </Text>
          </VStack>
        </HStack>

        <HStack gap={'$2'}>
          <Box rounded="$2xl" p={'$2'} bg="$backgroundLight100">
            <Icon as={BadgePercent} size={'xl'} />
          </Box>
          <VStack>
            <Text size="sm" color="$text400">
              Discount value
            </Text>
            <Text color="$text600" fontWeight="$semibold">
              {voucher.type === DiscountType.PERCENTAGE
                ? voucher.value + '%'
                : voucher.value + '$'}{' '}
              on {discountApplyType(voucher.applyType, voucher.applyValue)}
            </Text>
          </VStack>
        </HStack>
      </Container>
    </Container>
  );
}
