import { commentApi } from '@/api';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetSectionHeaderText,
  Button,
  ButtonText
} from '@/components';
import { IfRole } from '@/components/__custom__/Auth';
import { Container } from '@/components/__custom__/Container';
import { FormInput } from '@/components/__custom__/FormInput';
import { RatingInput } from '@/components/__custom__/RatingInput';
import { useCommentStore } from '@/configs/store/Comment.store';
import { useToast } from '@/hooks/useToast';
import { APIError, UserRole } from '@/types';
import { getResponseErrorMessage } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  content: z.string({
    required_error: 'Comment is required'
  }),
  rating: z.number().int().min(1).max(5).optional().default(5)
});

export function CreateCommentSheet({ productId }: { productId: string }) {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const orderItemId = useCommentStore.use.orderItemId();

  console.log(orderItemId)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      content: '',
      rating: 5
    },
    resolver: zodResolver(Schema)
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const postComment = useMutation({
    mutationFn: commentApi.create,
    onSuccess: () => {
      setShowActionsheet(false);
      queryClient.invalidateQueries({
        queryKey: ['comments', productId]
      });
      toast.show({
        title: 'Success',
        description: 'Comment posted',
        type: 'success'
      });
    },
    onError: (error) => {
      toast.show({
        title: 'Error',
        description: getResponseErrorMessage(error as APIError),
        type: 'error'
      });
    }
  });

  function onSubmit(data: z.infer<typeof Schema>) {
    postComment.mutate({
      ...data,
      productId,
      orderItemId: orderItemId ?? undefined
    });
  }

  function onClose() {
    setShowActionsheet(false);
    reset();
  }

  return (
    <IfRole is={UserRole.USER}>
      <Button
        onPress={() => {
          setShowActionsheet(true);
        }}
        action="primary"
        w="$full"
        bgColor="$primary500"
        size="xl"
        rounded="$none"
      >
        <ButtonText textTransform="uppercase" textAlign="center">
          Add comment
        </ButtonText>
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={onClose}>
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
            Add comment
          </ActionsheetSectionHeaderText>

          <ActionsheetItem w="$full" flexDirection="column">
            <Container w="$full" x pBottom>
              <FormInput
                control={control}
                name="content"
                label="Comment"
                multiline
                placeholder="Type your comment here"
                errorMessage={errors.content?.message}
              />

              <Controller
                name="rating"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Container y>
                    <RatingInput onChange={onChange} rating={value} />
                  </Container>
                )}
              />
            </Container>
          </ActionsheetItem>

          <Button
            w="$full"
            onPress={handleSubmit(onSubmit)}
            action="primary"
            rounded={'$none'}
          >
            <ButtonText textAlign="center">Post</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
    </IfRole>
  );
}
