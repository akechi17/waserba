import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import axiosClient from "../../axios-client";
import Alert from "../Alert";

const ProfileHeader = () => {
  const { data: me} = useQuery("me", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);

  return (
    <div className='w-full bg-main rounded-3xl flex flex-col'>
      <div className='my-6 flex flex-col justify-center items-center'>
        <div className='avatar static'>
          <div className='w-36 rounded-full'>
            <img
              src={
                me?.avatar_url
                  ? me.avatar_url
                  : `https://ui-avatars.com/api/?name=${me?.name}&amp;background=277bc0&amp;color=fff`
              }
              alt={`Avatar of ${me?.name}`}
            />
          </div>
        </div>
        <div className='text-lightOne mt-5 mx-1 text-center'>
          <h1 className='capitalize text-2xl font-bold'>{me?.name}</h1>
          <h1 className='text-lg'>+{me?.phone}</h1>
        </div>
        <div className='flex mt-5 gap-5'>
          <NavLink
            to='/edit-profil'
            className='flex text-lightOne justify-center items-center'
          >
            <Icon icon='mdi:pencil' width={27} />
            <h1 className='underline text-lg font-bold'>Edit Profil</h1>
          </NavLink>
          {message && <Alert text={message} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
