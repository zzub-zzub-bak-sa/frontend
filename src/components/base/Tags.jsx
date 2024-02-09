import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import size from '../../utils/size';
import { colors } from '../../styles/colors';
import IcClear from '../../assets/icons/IcClear';
import { body1 } from '../../styles/fonts';

const Tags = ({
  text,
  onPressTag,
  onDelete,
  style,
  color = 'primary',
  isEditPossible,
  height = 42,
}) => {
  const [bgColor, setBgColor] = useState('false');

  useEffect(() => {
    if (color === 'primary') {
      setBgColor(colors.orange);
    } else if (color === 'default') {
      setBgColor(colors.bg[100]);
    }
  }, [color]);

  const handleSliceText = () => {
    return text.length > 7 ? `${text.slice(0, 7)}...` : text;
  };

  const handleDeleteClick = e => {
    e.stopPropagation();
    onDelete && onDelete(text);
  };

  return (
    <TagWrapper onPress={onPressTag} style={style} bgColor={bgColor} height={height}>
      <TagText>{handleSliceText()}</TagText>
      {isEditPossible && (
        <TouchableOpacity onPress={handleDeleteClick}>
          <IcClear size={20} color="white" />
        </TouchableOpacity>
      )}
    </TagWrapper>
  );
};

export default Tags;

const TagWrapper = styled(TouchableOpacity)`
  height: ${({ height }) => size.width * height}px;
  background-color: ${({ bgColor }) => bgColor};
  padding: ${size.height * 8}px ${size.width * 12}px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ style }) => style};
`;

const TagText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${size.width * body1.medium.fontSize}px;
  color: white;
`;
