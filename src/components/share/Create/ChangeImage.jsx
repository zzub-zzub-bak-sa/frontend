import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import CommonBottomSheet from '../../base/modal/CommonBottomSheet';
import Button from '../../base/Button';
import IcCakeFolder from '../../../assets/icons/folders/IcCakeFolder';
import IcCoffeeFolder from '../../../assets/icons/folders/IcCoffeeFolder';
import IcFoodFolder from '../../../assets/icons/folders/IcFoodFolder';
import IcFolderFolder from '../../../assets/icons/folders/IcFolderFolder';
import IcHeartFolder from '../../../assets/icons/folders/IcHeartFolder';
import IcMarketFolder from '../../../assets/icons/folders/IcMarketFolder';
import IcPeopleFolder from '../../../assets/icons/folders/IcPeopleFolder';
import IcPersonFolder from '../../../assets/icons/folders/IcPersonFolder';
import IcRiceFolder from '../../../assets/icons/folders/IcRiceFolder';
import IcWineFolder from '../../../assets/icons/folders/IcWineFolder';
import { colors } from '../../../styles/colors';
import size from '../../../utils/size';

const iconComponents = [
  IcFolderFolder,
  IcCoffeeFolder,
  IcFoodFolder,
  IcHeartFolder,
  IcCakeFolder,
  IcMarketFolder,
  IcPeopleFolder,
  IcPersonFolder,
  IcRiceFolder,
  IcWineFolder,
];

const iconColors = [colors.folders.yellow, colors.folders.green, 'white', colors.folders.orange];

const icons = iconComponents.flatMap((IconComponent, idx) =>
  iconColors.map(color => ({
    IconComponent,
    color,
    id: `icon-${idx}-${color}`,
  })),
);

const SearchFolder = () => {
  const [selectedIconId, setSelectedIconId] = useState(null);

  const renderItem = ({ item }) => (
    <IconContainer selected={item.id === selectedIconId} onPress={() => setSelectedIconId(item.id)}>
      <item.IconComponent size={72} color="white" backgroundColor={item.color} />
    </IconContainer>
  );

  return (
    <CommonBottomSheet
      snapPoints={['70%', '90%']}
      title="이미지 변경"
      leftButtonType="back"
      rightButtonType="none"
    >
      <FlatList
        data={icons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={4}
        contentContainerStyle={{ alignItems: 'center' }}
      />
      <ButtonContainer>
        <Button width={350} height={54} text="선택하기" varient="filled" color="primary" />
      </ButtonContainer>
    </CommonBottomSheet>
  );
};

export default SearchFolder;

const IconContainer = styled(TouchableOpacity)`
  padding: ${size.width * 10}px;
  border-radius: 14px;
`;

const ButtonContainer = styled(View)`
  border-radius: 12px;
  margin: ${size.height * 32}px ${size.width * 20}px;
  background-color: ${colors.grey[100]};
`;
