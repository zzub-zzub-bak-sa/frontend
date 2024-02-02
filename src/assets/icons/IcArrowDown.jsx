import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IcArrowDown = ({ size = 24, colors = 'white' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12.3609 15.0005C11.9704 15.391 11.3372 15.391 10.9467 15.0005L6.52691 10.5807C6.23591 10.2897 6.23591 9.81792 6.52691 9.52691C6.81792 9.23591 7.28973 9.23591 7.58074 9.52691L10.9467 12.8929C11.3372 13.2834 11.9704 13.2834 12.3609 12.8929L15.7269 9.52691C16.0179 9.23591 16.4897 9.23591 16.7807 9.52691C17.0717 9.81792 17.0717 10.2897 16.7807 10.5807L12.3609 15.0005Z"
        fill={colors}
      />
    </Svg>
  );
};

export default IcArrowDown;
