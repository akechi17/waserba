import React, { createRef, useEffect, useState } from "react";
import { Header } from "../../components";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Identity = () => {
  const { activeMenu, currentColor } = useStateContext();
  const { data: about, isLoading } = useQuery("about", async () => {
    const response = await axiosClient.get("/about");
    return response.data.about;
  });

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Identitas' title='Koperasi' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-col md:flex-row items-center'>
            <img
              src='images/logo.png'
              alt='logo'
              width={90}
              className='my-5 w-36 md:w-40'
            />
            <div className='flex flex-col justify-center flex-wrap md:ml-5'>
              <h1 className='text-gray-700 dark:text-gray-200 transition duration-300 text-2xl font-bold capitalize text-center md:text-left'>
                {about.name}
              </h1>
              <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-semibold'>
                {about.legal_entity_id}, {about.legal_entity_date}
              </p>
              {about.address && (
                <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-medium'>
                  {about.address}, {about?.city}, {about?.province}
                </p>
              )}
            </div>
          </div>
          <div className='text-gray-700 dark:text-gray-200 transition duration-300 md:text-lg text-base'>
            <h1 className='text-2xl font-medium capitalize'>
              pengurus koperasi
            </h1>
            <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-medium mt-5'>
              <span className='flex'>
                <span className='w-40'>Ketua</span>
                <span>: {about.president}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Wakil</span>
                <span>: {about.vice_president}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Sekretaris</span>
                <span>: {about.secretary}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Pengawas1</span>
                <span>: {about.supervisor}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Pengawas2</span>
                <span>: {about.supervisor2}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Pengawas3</span>
                <span>: {about.supervisor3}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Bendahara</span>
                <span>: {about.treasurer}</span>
              </span>
              <span className='flex'>
                <span className='w-40'>Dewan Pengawas Syariah</span>
                <span>: {about.syariah_supervisor}</span>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Identity;
