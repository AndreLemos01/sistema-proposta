import React from 'react';
import classNames from 'classnames';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={classNames(
        'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:border-[#F39C12] transition duration-150',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
