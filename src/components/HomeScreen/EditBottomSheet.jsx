import React, { useEffect, useState } from 'react';
import CommonShortBottomSheet from '../base/modal/CommonShortBottomSheet';

// TODO: API 연동 이후 index -> id로 변경하기
const EditBottomSheet = ({ onClose, index }) => {
  const [editCondition, setEditCondition] = useState('');

  useEffect(() => {
    if (editCondition === '폴더삭제') {
      // index
    } else if (editCondition === '폴더편집') {
      // index
    }
  }, [editCondition]);

  return (
    <CommonShortBottomSheet
      onSetValue={setEditCondition}
      onClose={onClose}
      data={['폴더삭제', '폴더편집']}
      snapPoints={['20.8%']}
    />
  );
};

export default EditBottomSheet;
