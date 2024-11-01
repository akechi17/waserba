import React, { useState } from "react";
import { NewsCard, Header, InputText, Alert } from "../../../components";
import axiosClient from "../../../axios-client";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../../context/ContextProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

const fetchNews = async () => {
  const response = await axiosClient.get("/news");
  return response.data.news;
};

const Activity = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor } = useStateContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const { data: news, isLoading } = useQuery("news", fetchNews);
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });

  const handleAddClick = () => {
    setTitle("");
    setContent("");
    document.getElementById("form").showModal();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    axiosClient
      .post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        queryClient.invalidateQueries("news");
        setMessage(data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };


  const onDelete = (id) => {
    axiosClient
      .delete(`/news/${id}`)
      .then(({ data }) => {
        setMessage(data.message);
        queryClient.invalidateQueries("news");
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <div className='flex justify-center'>
        <Header title='Kegiatan Koperasi' />
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <div className='flex w-full justify-center flex-wrap'>
          <div className='w-full h-10 flex items-center justify-end'>
            {me?.role === "admin" && (
              <button
                className='btn btn-outline btn-info btn-sm text-white font-bold capitalize'
                onClick={handleAddClick}
              >
                Tambah Kegiatan
              </button>
            )}
          </div>
          {news?.map((item) => (
            <div key={item.id} className='flex'>
              <NewsCard news={item} />
              {me?.role === "admin" && (
                <button
                  className='btn btn-error btn-square btn-md my-5'
                  title='Hapus'
                  onClick={() => onDelete(item.id)}
                >
                  <Icon icon='bi:trash' color='#fff' width='25' />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <dialog id='form' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              {"Tambah Kegiatan"}
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <label className='relative form-control w-full my-2'>
              <div className='label'>
                <span className='label-text text-gray-700 dark:text-gray-200 transition duration-300 text-base capitalize'>
                  Foto Kegiatan
                </span>
              </div>
              <input
                type='file'
                className='file-input file-input-bordered w-full bg-white transition duration-300 dark:bg-main-dark-bg pr-10'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <InputText
              label='Judul'
              name='name'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Masukkan Judul"}
            />
            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text text-gray-700 dark:text-gray-200 transition duration-300 text-base'>
                  Deskripsi Kegiatan
                </span>
              </label>
              <textarea
                name='description'
                className='textarea textarea-bordered h-24 bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
                placeholder='Masukkan Deskripsi Kegiatan'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className='modal-action'>
              <button
                type='submit'
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("form").close();
                }}
                className='text-white p-2 hover:drop-shadow-xl rounded-md capitalize'
                style={{ backgroundColor: currentColor }}
              >
                submit
              </button>
            </div>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>Close</button>
        </form>
      </dialog>
      {message && <Alert text={message} />}
      {errors &&
        Object.keys(errors).map((key, index) =>
          errors[key].map((error, idx) => (
            <Alert
              key={`${key}-${idx}`}
              text={error}
              error
              index={index + idx}
            />
          ))
        )}
    </div>
  );
};

export default Activity;
