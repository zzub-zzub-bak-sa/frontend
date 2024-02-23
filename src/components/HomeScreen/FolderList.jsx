import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import size from '../../utils/size';
import { caption1 } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import IcArrowDown from '../../assets/icons/IcArrowDown';
import Folder from './Folder';

const FolderList = ({ onPressSort, sort, onPressKebab, folders }) => {
  const navigation = useNavigation();
  return (
    <Content>
      <SelectBox onPress={onPressSort}>
        <SelectText>{sort}</SelectText>
        <IcArrowDown />
      </SelectBox>
      <FlatList
        data={folders}
        renderItem={({ item }) => (
          <Folder
            id={item.id}
            title={item.name}
            onPressKebab={() => onPressKebab(item)}
            onPress={() => navigation.navigate('Gallery')}
          />
        )}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        ListFooterComponent={<FooterComponent />}
      />
    </Content>
  );
};

export default FolderList;

const Content = styled(View)`
  margin-top: ${size.height * 4}px;
  padding: 0 ${size.width * 20}px;
`;

const SelectBox = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${size.height * 20}px;
`;

const SelectText = styled(Text)`
  font-family: ${caption1.semibold.fontFamily};
  font-size: ${caption1.semibold.fontSize}px;
  color: ${colors.grey[500]};
`;

const FooterComponent = styled(View)`
  height: ${size.height * 150}px;
`;
