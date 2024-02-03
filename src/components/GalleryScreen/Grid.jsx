import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Check from '../../assets/icons/Check';
import size from '../../utils/size';
import { colors } from '../../styles/colors';

const Grid = ({ selected, onSelect, currentEdit }) => {
  const navigation = useNavigation();

  return (
    <GridWrapper>
      <FlatList
        data={Array(20)
          .fill(0)
          .map((_, i) => i + 1)}
        renderItem={({ item }) => {
          return currentEdit ? (
            <>
              {selected && selected.includes(item) ? (
                <SelectedBox onPress={() => onSelect(selected.filter(el => el !== item))}>
                  <CheckBox>
                    <Check size={24} color="white" />
                  </CheckBox>
                </SelectedBox>
              ) : (
                <ArticleBox
                  item={item}
                  onPress={() => (currentEdit ? onSelect([...selected, item]) : null)}
                />
              )}
            </>
          ) : (
            <ArticleBox item={item} onPress={() => navigation.navigate('Content')} />
          );
        }}
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
  background-color: ${colors.bg[200]};
  margin-bottom: ${size.height * 7}px;
  margin-right: ${({ item }) => (item % 3 !== 0 ? size.width * 7 : 0)}px;
`;

const SelectedBox = styled(ArticleBox)`
  background-color: ${colors.bg.selected};
  opacity: 0.9;
`;

const CheckBox = styled(View)`
  position: absolute;
  bottom: ${size.height * 8}px;
  right: ${size.width * 8}px;
`;

const FooterComponent = styled(View)`
  height: 150px;
`;
