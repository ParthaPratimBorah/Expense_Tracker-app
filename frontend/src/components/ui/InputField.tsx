import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={id}
          type={type}
          ref={ref}
          {...props}
          className="w-full px-3 py-2 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    );
  }
);

export default InputField;