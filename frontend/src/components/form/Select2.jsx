import React from "react";
import Select from "react-select";

const Select2 = ({ label, options, value, onChange }) => {
  return (
    <div className='relative form-control w-full my-2'>
      <label className='label'>
        <span className='label-text text-gray-700 dark:text-gray-200 transition duration-300 text-base capitalize'>
          {label}
        </span>
      </label>
      <Select
        value={options.find((option) => option.value === value)} // Set the selected option based on the value
        onChange={(selectedOption) =>
          onChange({
            target: { value: selectedOption ? selectedOption.value : "" },
          })
        } // Trigger onChange with the selected value
        isClearable={true}
        isSearchable={true}
        options={options}
      />
    </div>
  );
};

export default Select2;
