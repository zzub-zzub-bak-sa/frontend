import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import size from '../../utils/size';
import FolderBox from '../base/FolderBox';
import { subtitle1 } from '../../styles/fonts';

const FolderCard = ({ title, folderId, onPressFolder }) => {
  const navigation = useNavigation();
  return (
    <CardContainer
      onClick={() =>
        navigation.navigate('Gallery', {
          id: folderId,
        })
      }
    >
      <FolderBox iconSize={48} onPress={onPressFolder}>
        <ImageBox source={require('../../assets/images/folder-yellow.png')} />
      </FolderBox>
      <FolderText>{title}</FolderText>
    </CardContainer>
  );
};

export default FolderCard;

const CardContainer = styled(TouchableOpacity)`
  height: ${size.height * 80}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 16}px;
`;

const ImageBox = styled(Image)`
  width: ${size.width * 26.3}px;
  height: ${size.height * 24.135}px;
`;

const FolderText = styled(Text)`
  font-family: ${subtitle1.semibold.fontFamily};
  font-size: ${subtitle1.semibold.fontSize}px;
  color: white;
`;
