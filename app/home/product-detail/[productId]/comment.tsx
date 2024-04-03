import { SafeAreaView } from '@/components';
import { Container } from '@/components/__custom__/Container';
import { useLocalSearchParams } from 'expo-router';
import { CreateCommentSheet } from './components/CreateCommentSheet';
import { CommentList } from './components/CommentList';

export default function Comment() {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();

  return (
    <SafeAreaView flex={1}>
      <Container x y flex={1}>
        <CommentList productId={productId} />
      </Container>
      <CreateCommentSheet productId={productId} />
    </SafeAreaView>
  );
}
