import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import ContentScreen from '../pages/ContentScreen';
import GalleryScreen from '../pages/GalleryScreen';
import GallerySearchScreen from '../pages/GallerySearchScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="SearchGallery" component={GallerySearchScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
