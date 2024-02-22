import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';
import { WIDTH } from '../../constants/constants';
import { body1 } from '../../styles/fonts';
import IcClearCircle from '../../assets/icons/IcClearCircle';
import IcSearch from '../../assets/icons/IcSearch';

const SearchBox = ({ focus, keyword, onSetKeyword, onBlur, onFocus, onIntializeKeyword }) => {
  return (
    <InputWrapper>
      <InputBox focus={focus}>
        <IcSearch />
        <Input
          placeholder="폴더,태그를 검색해 보세요!"
          placeholderTextColor={colors.grey[200]}
          value={keyword}
          onChangeText={text => onSetKeyword(text)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {keyword && (
          <TouchableOpacity onPress={onIntializeKeyword}>
            <IcClearCircle />
          </TouchableOpacity>
        )}
      </InputBox>
    </InputWrapper>
  );
};

export default SearchBox;

const InputWrapper = styled(View)`
  height: ${size.height * 72}px;
  margin: 0 ${size.width * 24}px;
  justify-content: center;
`;

const InputBox = styled(View)`
  flex-direction: row;
  gap: ${size.width * 16}px;
  padding-bottom: ${size.height * 13}px;
  border-bottom-color: ${({ focus }) => (focus ? colors.orange : 'white')};
  border-bottom-width: 1px;
`;

const Input = styled(TextInput)`
  width: ${size.width * (WIDTH - 125)}px;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
`;
