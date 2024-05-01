import { commentApi } from '@/api';
import { Center, Icon, Text, VStack } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { MessageCircleXIcon } from 'lucide-react-native';
import { CommentItem } from './CommentItem';
// import Balancer from 'react-wrap-balancer';
import { IfRole } from '@/components/__custom__/Auth';
import { UserRole } from '@/types';

export function CommentList({ productId }: { productId: string }) {
  const comment = useQuery({
    queryKey: ['comments', productId],
    queryFn: () => commentApi.get(productId),
    select: (data) => data.data.data
  });

  if (!comment.isLoading && !comment.data?.comments.length) {
    return (
      <Center h={'$full'} gap={'$4'}>
        <Icon as={MessageCircleXIcon} size="6xl" color={'$text500'} />
        <Text textAlign="center">
          <IfRole is={[UserRole.USER]}>
            {/* <Balancer>No comments yet. Be the first to comment!</Balancer> */}
          </IfRole>
          <IfRole is={[UserRole.SHOP_OWNER]}>
            {/* <Balancer>
              This product has no comments yet. Share it with your customers to
              get their feedback!
            </Balancer> */}
          </IfRole>
        </Text>
      </Center>
    );
  }

  return (
    <VStack gap={'$6'}>
      {comment.data?.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </VStack>
  );
}
