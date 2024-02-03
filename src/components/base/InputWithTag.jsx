import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components';
import size from '../../utils/size';
import { body1 } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import Tags from './Tags';
import InputField from './InputField';

const InputWithTag = ({
  containerStyle = null,
  placeholder,
  value,
  onChangeValue,
  inputStyle = null,
  onFocus = () => null,
  max = 10,
}) => {
  const [tags, setTags] = useState([]);

  const handleTagAdd = () => {
    setTags([...tags, value]);
    onChangeValue('');
    console.log(tags);
  };
  const handleTagDelete = idx => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Container containerStyle={containerStyle}>
        <Scroll horizontal={true}>
          <Content>
            <TagWrapper>
              {tags.map((tag, idx) => (
                <Tags
                  key={idx}
                  text={tag}
                  onPressTag={() => handleTagDelete(idx)}
                  height={40}
                  isEditPossible
                />
              ))}
            </TagWrapper>

            {tags.length < 3 && (
              <InputWrapper hasTags={tags.length > 0}>
                <InputField
                  placeholder={placeholder}
                  placeholderTextColor={colors.grey[200]}
                  value={value}
                  onChangeText={text => onChangeValue(text)}
                  inputStyle={inputStyle}
                  onFocus={onFocus}
                  onEndEditing={handleTagAdd}
                  maxLength={max}
                  returnKeyType="done"
                />
              </InputWrapper>
            )}
          </Content>
        </Scroll>
      </Container>
      {value && (
        <SearchDropDown>
          {['양고기', '수우미양가', '양식 맛있겠다'].map(name => (
            <MatchedTagsBox key={name}>
              <MatchedTagsText>{name}</MatchedTagsText>
            </MatchedTagsBox>
          ))}
        </SearchDropDown>
      )}
    </>
  );
};

export default InputWithTag;

const Container = styled(View)`
  height: ${size.height * 68}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.orange};
  ${({ containerStyle }) => containerStyle};
  margin-top: ${size.height * 8}px;
`;

const Scroll = styled(ScrollView)`
  overflow: hidden;
`;

const Content = styled(View)`
  height: ${size.height * 50}px;
  flex-direction: row;
  align-items: center;
`;
const InputWrapper = styled(View)`
  margin-left: ${({ hasTags }) => (hasTags ? 8 : 0)}px;
`;

const TagWrapper = styled(View)`
  flex-direction: row;
  gap: ${size.width * 8}px;
`;

const SearchDropDown = styled(View)`
  width: '100%';
  height: ${size.height * 155}px;
  border-radius: 0 0 12px 12px;
  background-color: ${colors.grey[100]};
  padding: 0 ${size.width * 20}px;
  padding-top: ${size.height * 5}px;
`;

const MatchedTagsBox = styled(View)`
  padding: ${size.height * 10}px 0;
`;

const MatchedTagsText = styled(Text)`
  font-family: ${body1.medium.fontFamily};
  font-size: ${size.width * body1.medium.fontSize}px;
  color: white;
`;
