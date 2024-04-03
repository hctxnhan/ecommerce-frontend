import { commentApi } from "@/api";
import { VStack } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { CommentItem } from "./CommentItem";

export function CommentList({ productId }: { productId: string }) {
  const comment = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => commentApi.get(productId),
    select: (data) => data.data.data,
  });

  return <VStack gap={'$6'}>
    {comment.data?.comments.map((comment) => (
      <CommentItem key={comment._id} comment={comment} />
    ))}
  </VStack>
}
