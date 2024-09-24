import React, { useState } from "react";
import { Icon } from "@iconify/react";

const InputText = ({
  name,
  label,
  placeholder,
  type,
  innerRef,
  value,
  onChange,
  showeye,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(showeye ? "password" : "text");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text");
  };

  return (
    <div className='relative form-control w-full my-2'>
      <label className='label'>
        <span className='label-text text-gray-700 dark:text-gray-200 transition duration-300 text-base capitalize'>
          {label}
        </span>
      </label>
      <input
        type={type ? type : inputType}
        name={name}
        placeholder={placeholder}
        ref={innerRef}
        value={value}
        onChange={onChange}
        className='input input-bordered w-full bg-white transition duration-300 dark:bg-main-dark-bg pr-10' // Added pr-10 for padding-right
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
      {showeye && (
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-0 top-1/2 transform -translate-y-1/5 p-2'
        >
          <Icon
            className='text-gray'
            icon={
              isPasswordVisible ? "radix-icons:eye-open" : "eva:eye-off-2-fill"
            }
            width={25}
          />
        </button>
      )}
    </div>
  );
};

export default InputText;
