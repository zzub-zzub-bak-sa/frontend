import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

function FolderBox({ iconSize, children, onPress }) {
  return (
    <Folder iconSize={iconSize} onPress={onPress}>
      {children}
    </Folder>
  );
}

export default FolderBox;

const Folder = styled(TouchableOpacity)`
  height: ${({ iconSize }) => size.width * iconSize}px;
  width: ${({ iconSize }) => size.width * iconSize}px;
  background-color: ${colors.bg[100]};
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;
