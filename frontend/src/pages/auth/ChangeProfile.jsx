import React, { createRef, useEffect, useState } from "react";
import { Alert } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const ChangeProfile = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const { data: me, refetch: refetchUser } = useQuery("me", () =>
    axiosClient.get("/me").then(({ data }) => data)
  );

  const imageInputRef = createRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", imageInputRef.current.files[0]);

      await axiosClient.post("/avatars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      refetchUser();
    } catch (err) {
      const response = err.response;
      if (response && (response.status === 401 || response.status === 422)) {
        setError(response.data.message);
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, navigate]);

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='w-full flex flex-col'>
          <div className='my-10 flex flex-col justify-center items-center'>
            <div className='relative'>
              <div className='avatar static'>
                <div className='w-36 rounded-full'>
                  <img
                    src={selectedImage ? selectedImage : me?.avatar_url}
                    className='rounded-full w-36 h-36 min-w-full min-h-full max-w-36 max-h-36 object-fill'
                  />
                </div>
              </div>
              <div className='absolute bottom-0 right-0 flex justify-center items-center bg-main overflow-hidden rounded-full w-11 h-11'>
                <input
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={handleImageChange}
                  ref={imageInputRef}
                  className='absolute opacity-0 transform scale-150 cursor-pointer'
                />
                <Icon
                  icon='mdi:camera-enhance'
                  style={{ color: currentColor }}
                  width={30}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='mx-10 my-5'>
            {message && <Alert text={message} />}
            {error && <Alert text={error} error />}
            <button
              type='submit'
              className='flex h-14 w-full items-center justify-center rounded-[10px] bg-primary-50 p-4 text-[14px] font-semibold text-primary-400 shadow-sm md:text-base'
            >
              Update Foto Profil
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeProfile;
