import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import size from '../../utils/size';
import { colors } from '../../styles/colors';
import { subtitle2 } from '../../styles/fonts';

const Button = ({
  width = 350,
  height = 54 | 36,
  varient = 'outlined' | 'filled' | 'none',
  color = 'primary' | 'default' | 'disable',
  text,
  renderIcon = () => null,
  onPress,
  style,
}) => {
  const [buttonStyle, setButtonStyle] = useState({
    borderColor: '',
    bgColor: '',
    textColor: '',
  });

  useEffect(() => {
    switch (color) {
      case 'primary':
        if (varient === 'outlined') {
          return setButtonStyle({
            borderColor: colors.orange,
            bgColor: 'transparent',
            textColor: colors.orange,
          });
        } else if (varient === 'filled') {
          return setButtonStyle({
            borderColor: colors.orange,
            bgColor: colors.orange,
            textColor: 'white',
          });
        } else if (varient === 'none') {
          return setButtonStyle({
            borderColor: 'transparent',
            bgColor: 'transparent',
            textColor: colors.orange,
          });
        }
        break;
      case 'disable':
        if (varient === 'outlined') {
          return setButtonStyle({
            borderColor: colors.grey[100],
            bgColor: 'transparent',
            textColor: 'white',
          });
        } else if (varient === 'filled') {
          return setButtonStyle({
            borderColor: color.grey[100],
            bgColor: color.grey[100],
            textColor: 'white',
          });
        } else if (varient === 'none') {
          return setButtonStyle({
            borderColor: 'transparent',
            bgColor: 'transparent',
            textColor: 'white',
          });
        }
        break;
      case 'default':
        if (varient === 'outlined') {
          return setButtonStyle({
            borderColor: 'white',
            bgColor: 'transparent',
            textColor: 'white',
          });
        } else if (varient === 'filled') {
          return setButtonStyle({
            borderColor: 'white',
            bgColor: 'white',
            textColor: colors.black,
          });
        } else if (varient === 'none') {
          return setButtonStyle({
            borderColor: 'transparent',
            bgColor: 'transparent',
            textColor: 'white',
          });
        }
        break;
    }
  }, [varient, color]);

  return (
    <ButtonWrapper
      width={width}
      height={height}
      onPress={onPress}
      buttonStyle={buttonStyle}
      style={style}
    >
      {renderIcon()}
      <ButtonText height={height} buttonStyle={buttonStyle}>
        {text}
      </ButtonText>
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ width }) => size.width * width}px;
  height: ${({ height }) => size.height * height}px;
  background-color: ${({ buttonStyle }) => buttonStyle.bgColor};
  border: 1px solid ${({ buttonStyle }) => buttonStyle.borderColor};
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  gap: ${size.width * 4}px;
  ${({ style }) => style};
`;

const ButtonText = styled(Text)(props => ({
  fontFamily: subtitle2.semibold.fontFamily,
  fontSize: size.width * subtitle2.semibold.fontSize,
  color: props.buttonStyle.textColor,
}));
