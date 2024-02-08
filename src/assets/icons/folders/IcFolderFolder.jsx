import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const IcFolderFolder = ({ size, color, backgroundColor }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <Rect width="72" height="72" rx="14" fill="#282A32" />
      <Path
        d="M35.0443 22.347H27.9343C24.0673 22.347 21.0021 25.6097 21.2433 29.4693L22.0813 42.8774C22.3021 46.4107 25.2322 49.1633 28.7723 49.1633H43.0823C46.5855 49.1633 49.498 46.4662 49.7667 42.9734L50.4326 34.3161C50.7206 30.5719 47.7602 27.375 44.005 27.375H40.0724C38.6839 27.375 37.5584 26.2495 37.5584 24.861C37.5584 23.4726 36.4328 22.347 35.0443 22.347Z"
        fill={backgroundColor}
      />
    </Svg>
  );
};

export default IcFolderFolder;
