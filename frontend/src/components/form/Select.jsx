import React from "react";

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className='relative form-control w-full my-2'>
      <label className='label'>
        <span className='label-text text-gray-700 dark:text-gray-200 transition duration-300 text-base capitalize'>
          {label}
        </span>
      </label>
      <select
        className='select select-bordered w-full bg-white transition duration-300 dark:bg-main-dark-bg capitalize'
        value={value}
        onChange={onChange}
      >
        <option hidden value=''>
          Pilih
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
