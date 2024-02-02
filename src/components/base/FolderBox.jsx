import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

function FolderBox({ children }) {
  return <Folder>{children}</Folder>;
}

export default FolderBox;

const Folder = styled(View)`
  height: ${size.width * 72}px;
  width: ${size.width * 72}px;
  background-color: ${colors.bg[100]};
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;
