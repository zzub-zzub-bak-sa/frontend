import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IcUser from '../../assets/icons/IcUser';
import size from '../../utils/size';

const Header = () => {
  return (
    <HeaderWrapper>
      <TouchableOpacity onPress={() => null}>
        <IcUser />
      </TouchableOpacity>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled(View)`
  height: ${size.height * 60}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${size.width * 20}px;
`;
