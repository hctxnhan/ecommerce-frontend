import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  AddIcon,
  Button,
  ButtonText,
  Fab,
  FabIcon,
  FabLabel,
  ScrollView
} from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useToast } from '@/hooks/useToast';
import { DiscountSchema } from '@/utils/createVoucher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { VoucherForm } from './VoucherForm';
import { DiscountApplyType, DiscountType } from '@/types';
import { voucherApi } from '@/api/voucher';
import { useProfile } from '@/hooks/useProfile';

export function CreateVoucherSheet() {
  const [showActionsheet, setShowActionsheet] = useState(false);

  const form = useForm<z.infer<typeof DiscountSchema>>({
    resolver: zodResolver(DiscountSchema),
    defaultValues: {
      applyType: DiscountApplyType.ALL,
      startDate: new Date(),
      endDate: new Date(),
      type: DiscountType.PERCENTAGE,
      value: 0,
    }
  });

  const { handleSubmit, reset, watch } = form;
  const { profile } = useProfile();

  const toast = useToast();
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: voucherApi.create,
    onSuccess: () => {
      if (profile) {
        queryClient.invalidateQueries({
          queryKey: ['shop-vouchers', { id: profile?._id }]
        });
      }

      toast.show({
        title: 'Product created',
        type: 'success',
        description: 'Your product has been created successfully'
      });

      onClose();
      reset();
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        type: 'error',
        description: error.message
      });
    }
  });

  function onSubmit(data: z.infer<typeof DiscountSchema>) {
    create.mutate(data);
  }


  function onClose() {
    setShowActionsheet(false);
    reset();
  }

  return (
    <>
      <Fab
        onPress={() => setShowActionsheet(true)}
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
      >
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>Create voucher</FabLabel>
      </Fab>
      <Actionsheet snapPoints={[90]} isOpen={showActionsheet} onClose={onClose}>
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
            Create Voucher
          </ActionsheetSectionHeaderText>

          <ActionsheetItem flex={1} w="$full" flexDirection="column">
            <ScrollView flex={1} w="$full">
              <Container x pBottom flex={1} gap={'$8'}>
                <FormProvider {...form}>
                  <VoucherForm />
                </FormProvider>
              </Container>
            </ScrollView>
          </ActionsheetItem>

          <Button w="$full" onPress={handleSubmit(onSubmit)} rounded={'$none'}>
            <ButtonText textAlign="center">Create</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
