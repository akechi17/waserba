import React, { useEffect, useState } from "react";
import { Alert, Header, UploadPdf } from "../../components";
import axiosClient from "../../axios-client";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Icon } from "@iconify/react";

const Information = () => {
  const queryClient = useQueryClient();
  const { activeMenu } = useStateContext();
  const { data: information, isLoading } = useQuery("information", async () => {
    const response = await axiosClient.get("/information");
    return response.data.information;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const onDelete = (id) => {
    axiosClient
      .delete(`/information/${id}`)
      .then(({ data }) => {
        setMessage(data.message);
        queryClient.invalidateQueries("information");
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          setErrors(response.data.errors);
        }
      });
  };

  useEffect(() => {
    if (message || errors) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setErrors(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, errors]);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Informasi' title='Koperasi' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end'>
              {me?.role === "admin" && (
                <button
                  className='btn btn-outline btn-info btn-sm text-white font-bold capitalize'
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  Tambah File
                </button>
              )}
            </div>
          </div>
          {information?.map((info) => (
            <div className='flex gap-3'>
              {info?.pdf_url && (
                <>
                  {/\.(docx|doc|pdf)$/i.test(info.pdf_url) ? (
                    <iframe
                      key={info.id}
                      id='pdfViewer'
                      src={info.pdf_url}
                      className='w-full h-screen my-5'
                    ></iframe>
                  ) : (
                    <div className='w-full h-auto my-5'>
                      <img src={info.pdf_url} alt='Image preview' className="w-full" />
                    </div>
                  )}
                </>
              )}
              {me?.role === "admin" && (
                <button
                  className='btn btn-error btn-square btn-md my-5'
                  title='Hapus'
                  onClick={() => onDelete(info.id)}
                >
                  <Icon icon='bi:trash' color='#fff' width='25' />
                </button>
              )}
            </div>
          ))}
        </>
      )}
      <UploadPdf setMessage={setMessage} />
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

export default Information;
