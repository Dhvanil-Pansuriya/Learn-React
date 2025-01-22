import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  defaultValue = "",
  ...props
}, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 text-black pl-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-black focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className}`}
        ref={ref}
        id={id}
        {...props}
        defaultValue={defaultValue}
      />
    </div>
  );
});

export default Input;
    