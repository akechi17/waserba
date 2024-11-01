import React from "react";
import { Info, ProfileHeader } from "../../components";
import { useStateContext } from "../../context/ContextProvider";
import { Icon } from "@iconify/react";
import axiosClient from "../../axios-client";
import { useQuery, useQueryClient } from "react-query";

const Profile = () => {
  const { setToken } = useStateContext();
  const queryClient = useQueryClient();
  const { data: me} = useQuery("me", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      queryClient.invalidateQueries("me");
      setToken(null);
      window.location.reload();
    });
  };

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <ProfileHeader />
      <div className='flex flex-col my-5'>
        <div className='mx-10 my-5'>
          <h1 className='text-dark transition duration-300 dark:text-lightOne text-2xl font-bold'>
            Info Saya
          </h1>
          <div className='my-5 flex flex-col flex-wrap'>
            <Info
              title={me?.address ? `${me.address}, ${me.city} ${me.postcode}` : "-"}
              icon='mdi:location-on-outline'
            />
            <Info title={me?.phone ? `+${me.phone}` : "-"} icon='mdi:phone' />
          </div>
        </div>
        <div className='mx-10 my-5'>
          <button
            onClick={onLogout}
            to='/change-password'
            className='flex justify-between items-center text-red-500 hover:bg-light-gray rounded-xl w-full h-12 mb-10'
          >
            <div className='flex justify-center items-center text-xl font-bold capitalize gap-3'>
              <Icon icon='ph:sign-out-bold' width={30} />
              <h1>keluar</h1>
            </div>
            <Icon icon='octicon:chevron-right-16' width={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
