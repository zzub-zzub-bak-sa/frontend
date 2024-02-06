import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import StackNavigation from './src/navigations/StackNavigation';
import size from './src/utils/size';
import { colors } from './src/styles/colors';
import { subtitle3 } from './src/styles/fonts';

GestureHandlerRootView;

const toastConfig = {
  showSuccess: ({ text1, text2, onPressMove }) => (
    <SuccessToastContainer>
      <SuccessToastText>{text1}</SuccessToastText>
      <TouchableOpacity onPress={onPressMove}>
        <SuccessToastLink>{text2}</SuccessToastLink>
      </TouchableOpacity>
    </SuccessToastContainer>
  ),
};

function App() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
            <Toast config={toastConfig} />
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;

const SuccessToastContainer = styled(View)`
  height: ${size.height * 60}px;
  width: ${size.width * 350}px;
  background-color: ${colors.grey[200]};
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 4px 4px;
      shadow-opacity: 0.08;
      shadow-radius: 16px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;

const SuccessToastText = styled(Text)`
  font-family: ${subtitle3.bold.fontFamily};
  font-size: ${subtitle3.bold.fontSize}px;
  color: white;
`;

const SuccessToastLink = styled(Text)`
  font-family: ${subtitle3.medium.fontFamily};
  font-size: ${subtitle3.medium.fontSize}px;
  color: white;
`;
