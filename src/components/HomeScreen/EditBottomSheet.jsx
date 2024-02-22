import React, { useEffect, useRef, useState } from 'react';
import CommonShortBottomSheet from '../base/modal/CommonShortBottomSheet';

// TODO: API 연동 이후 index -> id로 변경하기
const EditBottomSheet = ({ onClose, index }) => {
  const [editCondition, setEditCondition] = useState('');
  const editRef = useRef(null);

  useEffect(() => {
    if (editCondition === '폴더삭제') {
      // index
    } else if (editCondition === '폴더편집') {
      // index
    }
  }, [editCondition]);

  return (
    <CommonShortBottomSheet
      ref={editRef}
      onSetValue={setEditCondition}
      onClose={() => {
        editRef?.current?.close();

        setTimeout(() => {
          onClose();
        }, 1000);
      }}
      data={['폴더삭제', '폴더편집']}
      snapPoints={['20.8%']}
    />
  );
};

export default EditBottomSheet;
