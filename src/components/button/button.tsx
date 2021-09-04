import React, { FC } from 'react'

import StyledButton from './button.style'

interface ButtonProps {
    title?: string
}

const Button: FC<ButtonProps> = ({ title }: ButtonProps) => (
    <StyledButton>
        {title || 'Нажать'}
    </StyledButton>
)

export default Button
