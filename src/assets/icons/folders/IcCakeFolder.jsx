import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const IcCakeFolder = ({ size, color, backgroundColor }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <Rect width="72" height="72" rx="14" fill="#282A32" />
      <Path
        d="M30.6294 51.7504H41.3705C42.2886 51.7504 43.0507 51.0409 43.1161 50.1251L44.685 29H27.3149L28.8839 50.1251C28.9493 51.0409 29.7113 51.7504 30.6294 51.7504Z"
        fill={backgroundColor}
      />

      <Path
        d="M43 19.375H29C28.0335 19.375 27.25 20.1585 27.25 21.125V22.875C27.25 23.3582 26.8582 23.75 26.375 23.75H24.625C24.1418 23.75 23.75 24.1418 23.75 24.625V26.375C23.75 26.8582 24.1418 27.25 24.625 27.25H47.375C47.8582 27.25 48.25 26.8582 48.25 26.375V24.625C48.25 24.1418 47.8582 23.75 47.375 23.75H45.625C45.1418 23.75 44.75 23.3582 44.75 22.875V21.125C44.75 20.1585 43.9665 19.375 43 19.375Z"
        fill={backgroundColor}
      />
    </Svg>
  );
};

export default IcCakeFolder;
