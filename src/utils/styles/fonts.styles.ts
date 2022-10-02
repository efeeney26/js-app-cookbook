import { css } from '@emotion/react';

import OpenSansRegularBold from '../../assets/fonts/OpenSansCondensed-Bold.ttf';
import OpenSansCondensedLight from '../../assets/fonts/OpenSansCondensed-Light.ttf';
import OpenSansCondensedLightItalic from '../../assets/fonts/OpenSansCondensed-LightItalic.ttf';

const fontsStyles = css`
  @font-face {
    font-family: 'OpenSansRegular';
    src: url(${OpenSansRegularBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenSansLight';
    src: url(${OpenSansCondensedLight}) format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenSansLightItalic';
    src: url(${OpenSansCondensedLightItalic}) format('truetype');
    font-weight: normal;
    font-style: normal;
}
`;

export default fontsStyles;
