import React, { FC, ButtonHTMLAttributes } from 'react';

import StyledButton from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
}

const Button: FC<ButtonProps> = ({ title, ...props }: ButtonProps) => (
  <StyledButton
    {...props}
  >
    {title || 'Нажать'}
  </StyledButton>
);

export default Button;
