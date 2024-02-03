import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';
import { caption1, subtitle1 } from '../../styles/fonts';
import IcDots from '../../assets/icons/IcDots';

const Folder = ({ title = '', numberOfLinks = 0, index, onPressKebab, onPress }) => {
  const handleNumberOfLinks = () => {
    return numberOfLinks >= 1000 ? '999+' : numberOfLinks;
  };

  return (
    <FolderWrapper index={index} onPress={onPress}>
      <KebabMenu onPress={onPressKebab}>
        <IcDots />
      </KebabMenu>
      <View>
        <IconWrapper>
          <Icon source={require('../../assets/images/folder-yellow.png')} />
        </IconWrapper>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Title>
        <Links>{handleNumberOfLinks()}개의 링크</Links>
      </View>
    </FolderWrapper>
  );
};

export default Folder;

const FolderWrapper = styled(TouchableOpacity)`
  width: ${size.width * 168}px;
  height: ${size.height * 136}px;
  border-radius: 12px;
  background-color: ${colors.bg[100]};
  padding: ${size.height * 16}px ${size.width * 16}px;
  margin-bottom: ${size.height * 14}px;
  margin-right: ${({ index }) => (index % 2 === 0 ? size.width * 14 : 0)}px;
`;

const KebabMenu = styled(TouchableOpacity)`
  position: absolute;
  right: ${size.width * 8}px;
  top: ${size.height * 12}px;
  z-index: 1;
`;

const IconWrapper = styled(View)`
  width: ${size.width * 48}px;
  height: ${size.height * 48}px;
  background-color: ${colors.bg[200]};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${size.height * 11}px;
`;

const Icon = styled(Image)`
  height: ${size.height * 24.135}px;
  width: ${size.width * 26.3}px;
`;

const Title = styled(Text)`
  width: ${size.width * 140}px;
  font-family: ${subtitle1.semibold.fontFamily};
  font-size: ${subtitle1.semibold.fontSize}px;
  color: white;
  overflow: hidden;
  margin-bottom: ${size.height * 4}px;
`;

const Links = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: ${colors.grey[300]};
`;
