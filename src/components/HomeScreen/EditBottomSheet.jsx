/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import CommonShortBottomSheet from '../base/modal/CommonShortBottomSheet';
import { deleteFolder, updateFolder } from '../../api/apis/folders';
import { tokenState } from '../../store/store';

const EditBottomSheet = ({ onClose, detailData }) => {
  const editRef = useRef(null);
  const token = useRecoilValue(tokenState);
  const [editCondition, setEditCondition] = useState('');

  const { mutate: doUpdate } = useMutation(updateFolder, {
    onSuccess: data => {
      if (data.success) {
        handleClose();
      }
    },
  });

  const { mutate: doDelete } = useMutation(deleteFolder, {
    onSuccess: data => {
      if (data.success) {
        handleClose();
      }
    },
  });

  const handleClose = () => {
    editRef?.current?.close();

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    if (editCondition === '폴더삭제') {
      doUpdate({ id: detailData.id, name: detailData.nme, assetType: detailData.assetType, token });
    } else if (editCondition === '폴더편집') {
      doDelete({ id: detailData.id, token });
    }
  }, [editCondition]);

  return (
    <CommonShortBottomSheet
      ref={editRef}
      onSetValue={setEditCondition}
      onClose={handleClose}
      data={['폴더삭제', '폴더편집']}
      snapPoints={['20.8%']}
    />
  );
};

export default EditBottomSheet;
