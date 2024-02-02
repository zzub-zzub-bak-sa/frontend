import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import GalleryScreen from '../pages/GalleryScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      {/* 다른 screen을 추가 */}
    </Stack.Navigator>
  );
};

export default StackNavigation;
