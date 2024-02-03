import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMe, updateUser } from './apis/account';

const template = () => {
  const [userData, setUserData] = useState([]);

  // getMe 안에 파라미터 필요하면 넣어도 ok
  const { refetch, isLoading } = useQuery(['this-is-a-key'], () => getMe(), {
    onSuccess: data => {
      if (!isLoading && !data) {
        refetch();
      }

      if (data) {
        setUserData(data);
      }
    },
  });

  const { mutate: updateProfile } = useMutation(updateUser, {
    onSuccess: data => {
      console.log(data);
    },
  });

  const handleUpdateProfile = id => {
    updateProfile({
      id,
    });
  };

  return (
    <TouchableOpacity onPress={handleUpdateProfile}>
      <Text>{...userData}</Text>
    </TouchableOpacity>
  );
};

export default template;
