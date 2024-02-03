import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import Card from '../../base/Card';
import Button from '../../base/Button';
import SearchInput from '../../base/SearchInput';
import size from '../../../utils/size';
import Folder from '../../../assets/icons/Folder';
import IcSearch from '../../../assets/icons/IcSearch';
import { WIDTH } from '../../../constants/constants';
import NoSearchResult from './NoSearchResult';

const SearchFolder = ({ onPressCard, selected, onClose, onPressNewFolder, data }) => {
  const [doSearch, setDoSearch] = useState(false);
  const bottomSheetRef = useRef();

  return (
    <CommonBottomSheet
      title="폴더 선택"
      rightButtonType="close"
      onRightButtonPress={onClose}
      ref={bottomSheetRef}
    >
      <SearchContainer>
        <Button
          width={105}
          height={36}
          varient="filled"
          color="default"
          text="폴더추가"
          renderIcon={() => <Folder size={24} />}
          onPress={onPressNewFolder}
        />
        {!doSearch ? (
          <TouchableOpacity onPress={() => setDoSearch(true)}>
            <IcSearch size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <SearchInput width={size.width * (WIDTH - 163)} />
        )}
      </SearchContainer>
      {data.map(el => (
        <Card
          key={el}
          title={el}
          numberOfLinks={99}
          isSelected={selected === el}
          onPress={() => {
            if (selected === el) {
              onPressCard('');
            } else {
              onPressCard(el);
            }
          }}
        />
      ))}
      <BottomButton
        text="선택하기"
        height={54}
        varient="filled"
        color="primary"
        onPress={() => (selected ? onClose() : null)}
      />
      {data.length === 0 && <NoSearchResult />}
    </CommonBottomSheet>
  );
};

export default SearchFolder;

const SearchContainer = styled(View)`
  flex-direction: row;
  gap: ${size.width * 16}px;
  align-items: center;
  margin: 0 ${size.width * 20}px;
`;

const BottomButton = styled(Button)`
  position: absolute;
  bottom: 35px;
  margin-left: ${size.width * 24}px;
`;
