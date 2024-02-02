import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import { NoSearchResult } from './NoSearchResult';
import SearchInput from '../../base/SearchInput';
import Card from '../../base/Card';
import Button from '../../base/Button';
import { colors } from '../../../styles/colors';
import Folder from '../../../assets/icons/Folder';
import styled from 'styled-components';

const SearchFolder = () => {
  return (
    <CommonBottomSheet title="폴더 선택" rightButtonType="close">
      <SearchContainer>
        <Button
          width={93}
          height={36}
          varient="filled"
          color="default"
          text="폴더추가"
          renderIcon={() => <Folder size={24} />}
          onPress={() => console.log('Add folder pressed')}
        />
        <SearchInput width={241} />
      </SearchContainer>
      <FolderListContainer>
        <Card title="먹고싶은 것" numberOfLinks={340} />
      </FolderListContainer>
    </CommonBottomSheet>
  );
};

export default SearchFolder;

const SearchContainer = styled(View)`
  flex-direction: row;
  gap: 16px;
  align-items: center;
  margin: 0 20px;
  margin-right: 20px;
`;

const FolderListContainer = styled(View)`
  padding: 16px 0;
  background-color: colors.bg[400]
`;
