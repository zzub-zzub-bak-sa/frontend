import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { body1 } from '../../styles/fonts';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

const InputField = ({
  value,
  onChangeValue,
  placeholder,
  placeholderTextColor,
  onFocus,
  onEndEditing,
  maxLength,
  style,
}) => {
  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={text => onChangeValue(text)}
        inputStyle={style}
        onFocus={onFocus}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
        returnKeyType="done"
      />
    </InputWrapper>
  );
};

export default InputField;

const InputWrapper = styled(View)`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.orange};
  ${({ containerStyle }) => containerStyle};
  /* margin-top: ${size.height * 8}px; */
`;

const Input = styled(TextInput)`
  width: 100%;
  height: ${size.height * 22}px;
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
  ${({ inputStyle }) => inputStyle}
  margin-bottom: ${size.height * 16}px;
`;
