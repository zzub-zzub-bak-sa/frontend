import Toast from 'react-native-toast-message';

// eslint-disable-next-line import/prefer-default-export
export const showSuccessToast = ({ text1, text2, onPressMove }) => {
  Toast.show({
    type: 'showSuccess',
    text1,
    text2,
    onPressMove,
    position: 'bottom',
    visibilityTime: 5000,
  });
};
