import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import {
  Alert,
  AuthHeader,
  LoginInput,
  TelephoneInput,
} from "../components/index.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";

const Login = () => {
  const { setToken } = useStateContext();
  const passwordRef = createRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState(null);
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      phone: phoneNumber,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/auth/login", payload)
      .then(({ data }) => {
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (
          (response && response.status === 401) ||
          (response && response.status === 422)
        ) {
          setErrors(response.data.errors);
        }
      });
  };

  useEffect(() => {
    if (errors) {
      const timeoutId = setTimeout(() => {
        setErrors(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [errors, setErrors]);

  return (
    <>
      <AuthHeader />
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 md:px-12 xl:flex-none xl:px-24'>
        <Link to='/' className='mb-14 flex shrink-0 items-center'>
          <img
            className='h-40 w-auto hover:cursor-pointer'
            src='/images/logo.png'
            alt='logo'
          />
        </Link>
        <div className='mx-auto w-full'>
          <div>
            <h5 className='text-[14px] font-semibold uppercase leading-[26px] tracking-[0.2em] text-primary-400 md:text-[16px] lg:text-[18px]'>
              masuk akun waserba
            </h5>
            <h2 className='text-[44px] font-extrabold tracking-tighter text-[#20184E] md:text-[56px] lg:text-[64px]'>
              Selamat Datang
            </h2>
            <p className='mt-2 text-base text-gray-600'>
              Masukkan nomor WhatsApp dan password anda untuk masuk
            </p>
          </div>
          <div className='mt-8'>
            {errors && <Alert text={errors} error />}
            <div className='mt-6'>
              <form className='space-y-6' onSubmit={onSubmit} method='POST'>
                <TelephoneInput value={phoneNumber} setValue={setPhoneNumber} />
                <LoginInput
                  innerRef={passwordRef}
                  name='password'
                  label='Password'
                  icon='mdi:lock-outline'
                  showeye
                />
                <div>
                  <button
                    type='submit'
                    className='flex h-14 w-full items-center justify-center rounded-[10px] bg-primary-50 p-4 text-[14px] font-semibold text-primary-400 shadow-sm md:text-base'
                  >
                    Masuk Sekarang
                  </button>
                </div>
                <div className='flex flex-col space-y-2 text-center text-sm'>
                  <Link
                    className='font-semibold text-primary-400'
                    to='/account/auth/forgot-password'
                  >
                    Lupa Password
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
