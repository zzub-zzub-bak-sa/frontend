import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { body1 } from '../../../styles/fonts';
import size from '../../../utils/size';

const NoSearchResult = ({ onAddFolder }) => (
  <NoResultsContainer>
    <NoResultText>검색 결과가 없어요.</NoResultText>
    <NoResultText>새 폴더를 추가하시겠어요?</NoResultText>
    <StyledButton onPress={onAddFolder}>
      <StyledButtonText>새 폴더 추가하기</StyledButtonText>
    </StyledButton>
  </NoResultsContainer>
);

export default NoSearchResult;

const NoResultsContainer = styled(View)`
  height: 150%;
  background-color: ${colors.bg[400]};
  align-items: center;
  justify-content: center;
  padding: ${size.width * 20}px;
`;

const NoResultText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  line-height: ${size.width * 16 * 1.2}px;
  color: white;
  font-size: ${size.width * 16}px;
  text-align: center;
  margin-bottom: ${size.height * 4}px;
`;

const StyledButton = styled(TouchableOpacity)`
  height: ${size.height * 36}px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
  color: white;
  padding: ${size.height * 4}px ${size.width * 12}px;
  margin-top: ${size.height * 16}px;
`;

const StyledButtonText = styled(Text)`
  color: white;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
`;
