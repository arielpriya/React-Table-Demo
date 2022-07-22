import React from 'react';
import { ButtonProps } from './ButtonTypes';

export const BoxButton = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mr-2 bg-aidonicOrange hover:bg-aidonicDarkOrange text-[14px] text-[#fff] px-7 py-[4.5px] h-[30px] rounded-[4px]"
    >
      {children}
    </button>
  );
};

