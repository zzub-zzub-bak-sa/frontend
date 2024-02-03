import React, { useEffect, useState } from 'react';
import CommonShortBottomSheet from '../base/modal/CommonShortBottomSheet';
import size from '../../utils/size';

const TagEditSelectBottomSheet = ({ onClose, index }) => {
  const [editCondition, setEditCondition] = useState('');

  useEffect(() => {
    if (editCondition === '태그 편집') {
      // index
    } else if (editCondition === '이동') {
      // index
    } else if (editCondition === '삭제') {
      // index
    }
  }, [editCondition]);

  return (
    <CommonShortBottomSheet
      onSetValue={setEditCondition}
      onClose={onClose}
      data={['태그 편집', '이동', '삭제']}
      snapPoints={[size.height * 234, size.height * 300]}
    />
  );
};

export default TagEditSelectBottomSheet;
