import React, { useEffect, useState } from 'react';
import CommonShortBottomSheet from '../base/modal/CommonShortBottomSheet';
import size from '../../utils/size';

const TagEditSelectBottomSheet = ({ onClose, onSelectOption }) => {
  const handleOptionSelect = option => {
    switch (option) {
      case '태그 편집':
        onSelectOption('태그 편집');
        break;
      case '이동':
        onSelectOption('이동');
        break;
      case '삭제':
        onSelectOption('삭제');
        break;
    }
    onClose();
  };

  return (
    <CommonShortBottomSheet
      onSetValue={handleOptionSelect}
      onClose={onClose}
      data={['태그 편집', '이동', '삭제']}
      snapPoints={[size.height * 234, size.height * 300]}
    />
  );
};

export default TagEditSelectBottomSheet;
