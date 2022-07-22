import React, { useRef } from 'react';
import { BoxProps } from './BoxProps';

const BoxHeader = ({
  children,
  title = '',
  info = false,
  paragraph = ''
}: BoxProps) => {
  return (
    <>
      <div className="border-boxBorderColor border-[1px] border-b-0 p-4 bg-gray-50 relative flex items-start justify-between mt-[35px] rounded-t-[4px]">
        <div>
          <h2 className="relative font-HelveticaBold font-semibold  text-aidonicDarkBlue">
            {title}
            {info && (
              <span className="ml-2 text-aidonicBlue font-Helvetica text-[14px] cursor-pointer">
                Info
              </span>
            )}
          </h2>
          <p className="font-Helvetica text-aidOnicGray text-[14px]">
            {paragraph}
          </p>
          
        </div>
        {children}
      </div>
    </>
  );
};

export default BoxHeader;
