import React, { forwardRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../styles/colors';
import size from '../../../utils/size';
import { body1 } from '../../../styles/fonts';

const CommonShortBottomSheet = forwardRef(
  ({ snapPoints = ['27.5%'], index = 0, style, onSetValue, onClose, data = [] }, ref) => {
    const handleChange = props => {
      if (props.toLocaleString() < 0) {
        onClose();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.bg[200] }}
        onChange={handleChange}
        style={style}
      >
        <Container>
          {data.map(text => (
            <Box
              key={text}
              onPress={() => {
                onSetValue(text);
                onClose();
              }}
            >
              <BoxText>{text}</BoxText>
            </Box>
          ))}
          <BottomView />
        </Container>
      </BottomSheet>
    );
  },
);

export default CommonShortBottomSheet;

const Container = styled(View)`
  background-color: white;
  border-radius: 24px 24px 0 0;
  background-color: ${colors.bg[200]};
  padding-top: ${size.height * 20}px;
`;

const Box = styled(TouchableOpacity)`
  height: ${size.height * 58}px;
  padding: 0 ${size.width * 16}px;
  justify-content: center;
`;

const BoxText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${body1.medium.fontSize}px;
  color: white;
`;

const BottomView = styled(View)`
  height: ${size.height * 40}px;
`;
