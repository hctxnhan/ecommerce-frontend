import { HStack, Text, VStack } from '@/components';
import { Rating } from '@/components/__custom__/Rating';
import { Comment } from '@/types';

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <VStack
      p={'$3'}
      gap={'$2'}
      borderWidth={1}
      rounded={'$lg'}
      borderColor={'$borderLight200'}
    >
      <Text color="$primary500" fontWeight="bold">
        {comment.userName}
        <Text>{comment.orderItemId && ' (purchase verified)'}</Text>
      </Text>
      <Text size="sm" color="$text400" fontStyle="italic">
        {new Date(comment.createdAt).toDateString()}
      </Text>
      {comment.rating && <Rating long rating={comment.rating} />}
      <Text>{comment.content}</Text>
    </VStack>
  );
}
