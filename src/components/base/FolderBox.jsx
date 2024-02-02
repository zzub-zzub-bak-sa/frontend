import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

function FolderBox({ iconSize, children }) {
  return <Folder iconSize={iconSize}>{children}</Folder>;
}

export default FolderBox;

const Folder = styled(View)`
  height: ${({ iconSize }) => size.height * iconSize}px;
  width: ${({ iconSize }) => size.width * iconSize}px;
  background-color: ${colors.bg[100]};
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;
