import React, { forwardRef, ComponentPropsWithoutRef } from 'react';

import { VideoStyled } from './Camera.styles';

type CameraProps = ComponentPropsWithoutRef<'video'>;

export const Camera = forwardRef<HTMLVideoElement, CameraProps>((props, ref) => (
  <VideoStyled
    ref={ref}
    {...props}
  />
));
