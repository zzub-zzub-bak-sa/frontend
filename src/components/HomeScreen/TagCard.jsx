import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import FolderBox from '../base/FolderBox';
import { body1, caption1 } from '../../styles/fonts';
import { colors } from '../../styles/colors';

const TagCard = ({ tag, image }) => {
  return (
    <TagCardWrapper>
      <FolderBox iconSize={88}>
        <Image source={{ uri: image }} />
      </FolderBox>
      <View>
        <Category>카테고리명</Category>
        <TagBox>
          <TagBoxText># {tag}</TagBoxText>
        </TagBox>
      </View>
    </TagCardWrapper>
  );
};

export default TagCard;

const TagCardWrapper = styled(TouchableOpacity)`
  height: ${size.height * 128}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 20}px;
`;

const Category = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: ${colors.grey[300]};
`;

const TagBox = styled(View)`
  height: ${size.height * 42}px;
  padding: 0 ${size.width * 12}px;
  align-items: center;
  justify-content: center;
`;

const TagBoxText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
`;
