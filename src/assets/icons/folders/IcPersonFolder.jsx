{
  /* <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="72" height="72" rx="14" fill="#282A32"/>
<path d="M36 36C40.8325 36 44.75 32.0825 44.75 27.25C44.75 22.4175 40.8325 18.5 36 18.5C31.1675 18.5 27.25 22.4175 27.25 27.25C27.25 32.0825 31.1675 36 36 36Z" fill="#F9D869"/>
<path d="M36 53.5C43.732 53.5 50 49.9742 50 45.625C50 41.2758 43.732 37.75 36 37.75C28.268 37.75 22 41.2758 22 45.625C22 49.9742 28.268 53.5 36 53.5Z" fill="#F9D869"/>
</svg> */
}

import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const IcPersonFolder = ({ size, color, backgroundColor }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <Rect width="72" height="72" rx="14" fill="#282A32" />
      <Path
        d="M36 36C40.8325 36 44.75 32.0825 44.75 27.25C44.75 22.4175 40.8325 18.5 36 18.5C31.1675 18.5 27.25 22.4175 27.25 27.25C27.25 32.0825 31.1675 36 36 36Z"
        fill={backgroundColor}
      />
      <Path
        d="M36 53.5C43.732 53.5 50 49.9742 50 45.625C50 41.2758 43.732 37.75 36 37.75C28.268 37.75 22 41.2758 22 45.625C22 49.9742 28.268 53.5 36 53.5Z"
        fill={backgroundColor}
      />
    </Svg>
  );
};

export default IcPersonFolder;
