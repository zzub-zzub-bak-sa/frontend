import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { HEIGHT } from '../../constants/constants';
import { body1 } from '../../styles/fonts';

const NoResult = () => {
  return (
    <View>
      <NoResultBox>
        <NoResultText>검색결과가 없어요 :(</NoResultText>
        <NoResultText>검색어를 바꿔서 다시 시도해보시는건</NoResultText>
        <NoResultText>어때요?</NoResultText>
      </NoResultBox>
    </View>
  );
};

export default NoResult;

const NoResultBox = styled(View)`
  height: ${size.height * (HEIGHT / 2)}px;
  align-items: center;
  justify-content: center;
`;

const NoResultText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
  line-height: ${size.height * 25.6}px;
  opacity: 0.8;
`;
