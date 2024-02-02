import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import { HEIGHT, WIDTH } from '../../constants/constants';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

function Layout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

export default Layout;

const LayoutWrapper = styled(SafeAreaView)`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  padding: 0 ${size.width * 20}px;
  background-color: ${colors.bg[400]};
`;
