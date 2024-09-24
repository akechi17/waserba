import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const TelephoneInput = ({ value, setValue }) => {
  const [valid, setValid] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(value !== "");
  };

  const handleChange = (value) => {
    setValue(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <>
      <div
        className={`input-div mb-4 phone-input grid-cols-10 ${
          isFocus ? "focus" : ""
        }`}
      >
        <PhoneInput
          country={"id"}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputProps={{
            required: true,
          }}
        />
      </div>
      {!valid && (
        <p className='mt-1 text-sm font-medium text-red-600 '>
          Nomor WhatApp tidak valid.
        </p>
      )}
    </>
  );
};

export default TelephoneInput;
