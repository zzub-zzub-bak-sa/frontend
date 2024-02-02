import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const IcHeartFolder = ({ size, color, backgroundColor }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <Rect width="72" height="72" rx="14" fill="#282A32" />
      <Path
        d="M53.1648 34.544C51.4566 41.7775 41.4633 48.1894 37.5606 50.4513C36.5858 51.0162 35.4142 51.0162 34.4394 50.4513C30.5367 48.1894 20.5434 41.7775 18.8352 34.544C17.2927 28.0122 21.2074 21.2256 27.8364 21.128C27.9733 21.126 28.1121 21.125 28.2531 21.125C30.9216 21.125 33.3041 22.4579 34.7008 23.4434C35.4639 23.9818 36.5361 23.9818 37.2992 23.4434C38.6959 22.4579 41.0784 21.125 43.747 21.125C43.8879 21.125 44.0267 21.126 44.1636 21.128C50.7926 21.2256 54.7073 28.0122 53.1648 34.544Z"
        fill={backgroundColor}
      />
    </Svg>
  );
};

export default IcHeartFolder;
