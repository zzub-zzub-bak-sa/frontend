import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Check from '../../assets/icons/Check';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

const Grid = ({ selected, onSelect, currentEdit, data }) => {
  const navigation = useNavigation();

  const handleSelect = item => {
    if (currentEdit) {
      if (selected.includes(item)) {
        onSelect(selected.filter(el => el !== item));
      } else {
        onSelect([...selected, item]);
      }
    }
  };

  return (
    <GridWrapper>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ArticleBox
            item={item}
            selected={currentEdit && selected.includes(item)}
            onPress={() =>
              currentEdit
                ? handleSelect(item)
                : navigation.navigate('Content', {
                    id: item.id,
                  })
            }
          >
            {currentEdit && selected.includes(item) && (
              <CheckBox>
                <Check size={24} color="white" />
              </CheckBox>
            )}
            <CoverImage src={item.contentUrl} alt={item.url} />
          </ArticleBox>
        )}
        ListFooterComponent={<FooterComponent />}
        numColumns={3}
      />
    </GridWrapper>
  );
};

export default Grid;

const GridWrapper = styled(View)`
  padding: 0 ${size.width * 20}px;
`;

const ArticleBox = styled(TouchableOpacity)`
  width: ${size.width * 112}px;
  height: ${size.height * 112}px;
  border-radius: 16px;
  background-color: ${({ selected }) => (selected ? colors.bg.selected : colors.bg[200])};
  margin-bottom: ${size.height * 7}px;
  margin-right: ${({ item }) => (item % 3 !== 0 ? size.width * 7 : 0)}px;
  opacity: ${({ selected }) => (selected ? 0.9 : 1)};
  position: relative;
  overflow: 'hidden';
`;

const CheckBox = styled(View)`
  position: absolute;
  bottom: ${size.height * 8}px;
  right: ${size.width * 8}px;
`;

const FooterComponent = styled(View)`
  height: 150px;
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
`;
