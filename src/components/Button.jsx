import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-black",
  textColor = "text-white",
  className = "",
  hoverBgColor = "hover:bg-gray-800",
  focusRingColor = "focus:ring-black",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-3 rounded-lg ${bgColor} ${textColor} ${className} ${hoverBgColor} ${focusRingColor} focus:outline-none focus:ring-2 transition duration-300`}
      {...props}
    >
      {children}
    </button>
  );
}
