import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IcDots = ({ size = 24, color = 'white' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 5.75509C11.3096 5.75509 10.75 5.19545 10.75 4.50509V4.49609C10.75 3.80574 11.3096 3.24609 12 3.24609C12.6904 3.24609 13.25 3.80574 13.25 4.49609V4.50509C13.25 5.19545 12.6904 5.75509 12 5.75509Z"
        fill={color}
      />
      <Path
        d="M12 13.2551C11.3096 13.2551 10.75 12.6954 10.75 12.0051V11.9961C10.75 11.3057 11.3096 10.7461 12 10.7461C12.6904 10.7461 13.25 11.3057 13.25 11.9961V12.0051C13.25 12.6954 12.6904 13.2551 12 13.2551Z"
        fill={color}
      />
      <Path
        d="M10.75 19.5051C10.75 20.1954 11.3096 20.7551 12 20.7551C12.6904 20.7551 13.25 20.1954 13.25 19.5051V19.4961C13.25 18.8057 12.6904 18.2461 12 18.2461C11.3096 18.2461 10.75 18.8057 10.75 19.4961V19.5051Z"
        fill={color}
      />
    </Svg>
  );
};

export default IcDots;