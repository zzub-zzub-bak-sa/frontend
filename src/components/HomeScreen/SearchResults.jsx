import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import size from '../../utils/size';
import { body2 } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import FolderCard from './FolderCard';
import TagCard from './TagCard';
import NoResult from './NoResult';
import { tokenState } from '../../store/store';
import { getSearch } from '../../api/apis/folders';
import { getTags } from '../../api/apis/tags';

const SearchResults = ({ keyword }) => {
  const token = useRecoilValue(tokenState);
  const navigation = useNavigation();
  const [folderData, setFolderData] = useState([]);
  const [tagData, setTagData] = useState([]);

  useQuery(['search-folders', keyword], () => getSearch({ keyword, token }), {
    onSuccess: data => {
      if (data.code === 'OK') {
        setFolderData(data.data.folders);
      }
    },
  });

  useQuery(['search-tags', keyword], () => getTags({ keyword, token }), {
    onSuccess: data => {
      if (data.code === 'OK') {
        setTagData(data.data);
      }
    },
  });

  return (
    <ScrollView>
      {tagData && folderData ? (
        <>
          <View>
            <CategoryBox>
              <Category>폴더</Category>
              <FolderCount>{folderData.length}건</FolderCount>
            </CategoryBox>
            {folderData.map(folder => (
              <FolderCard
                key={folder.name}
                title={folder.name}
                folderId={folder.id}
                onPressFolder={() =>
                  navigation.navigate('Gallery', {
                    id: folder.id,
                  })
                }
              />
            ))}
            {folderData.length > 3 && (
              <>
                <SeeMore>
                  <SeeMoreText>더보기</SeeMoreText>
                </SeeMore>
                <Divider />
              </>
            )}
          </View>
          <View>
            <CategoryBox>
              <Category>태그</Category>
              <FolderCount>{tagData.length}건</FolderCount>
            </CategoryBox>
            {tagData.map(tag => (
              <TagCard key={tag} tag={tag} image={tag} />
            ))}
            {tagData.length > 3 && (
              <>
                <SeeMore>
                  <SeeMoreText>더보기</SeeMoreText>
                </SeeMore>

                <Divider />
              </>
            )}
          </View>
        </>
      ) : (
        <NoResult />
      )}
    </ScrollView>
  );
};

export default SearchResults;

const CategoryBox = styled(View)`
  height: ${size.height * 52}px;
  padding: 0 ${size.width * 20}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.width * 8}px;
`;

const Category = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[400]};
`;

const FolderCount = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[300]};
`;

const SeeMore = styled(TouchableOpacity)`
  height: ${size.height * 56}px;
  align-items: center;
  justify-content: center;
  border-top-width: 0.4px;
  border-top-color: ${colors.grey[200]};
`;

const SeeMoreText = styled(Text)`
  font-family: ${body2.medium.fontFamily};
  font-size: ${body2.medium.fontSize}px;
  color: ${colors.grey[300]};
`;

export const Divider = styled(View)`
  height: ${size.height * 12}px;
  background-color: ${colors.black};
`;
