import { SafeAreaView as RNSafeAreaView } from 'react-native';

import { styled } from '@gluestack-style/react';

const StyledRoot = styled(RNSafeAreaView, {
  backgroundColor: '$backgroundLight0'
});

export const SafeAreaView = StyledRoot;
