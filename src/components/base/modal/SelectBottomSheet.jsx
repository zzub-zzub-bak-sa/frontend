import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import Button from '../Button';
import { WIDTH } from '../../../constants/constants';
import size from '../../../utils/size';
import { colors } from '../../../styles/colors';
import { body1 } from '../../../styles/fonts';

const SelectBottomSheet = ({ text, disable, onPress }) => {
  return (
    <Select>
      <SelectText>{text}</SelectText>
      <Button
        height={36}
        width={51}
        text="다음"
        varient="filled"
        color={!disable ? 'primary' : 'disable'}
        disabled={disable}
        onPress={onPress}
      />
    </Select>
  );
};

export default SelectBottomSheet;

const Select = styled(View)`
  width: ${WIDTH}px;
  height: ${size.height * 96}px;
  background-color: ${colors.grey[200]};
  position: absolute;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${size.width * 20}px;
`;

const SelectText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: ${colors.grey[400]};
`;
