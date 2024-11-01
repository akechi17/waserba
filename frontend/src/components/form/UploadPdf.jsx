import React, { createRef, useState } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { Icon } from "@iconify/react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

const UploadPdf = ({ setMessage }) => {
  const queryClient = useQueryClient();
  const { currentColor } = useStateContext();
  const resumeRef = createRef();
  const [filename, setFileName] = useState("No selected file");

  const uploadResumeMutation = useMutation(
    (file) =>
      axiosClient.post("/information", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("information");
        document.querySelector("#my_modal_2").close();
        setMessage("Berhasil mengupload PDF");
      },
    }
  );

  const handleInputClick = () => {
    document.querySelector(".input-field").click();
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = new FormData();
    payload.append("pdf", resumeRef.current.files[0]);

    try {
      await uploadResumeMutation.mutateAsync(payload);
    } catch (error) {
      const response = error.response;
      if (response && (response.status === 401 || response.status === 500)) {
        setMessage(response.data.message);
      }
    }
  };

  return (
    <dialog id='my_modal_2' className='modal'>
      <div className='modal-box flex flex-col justify-center items-center bg-white dark:bg-main-dark-bg'>
        <form
          className='flex flex-col justify-center items-center border-2 border-dashed h-72 w-80 md:w-400 cursor-pointer rounded-md'
          style={{ borderColor: currentColor }}
          onClick={handleInputClick}
          onSubmit={onSubmit}
          encType='multipart/form-data'
        >
          <input
            type='file'
            name='resume'
            ref={resumeRef}
            accept='.doc, .docx, .pdf, .jpg, .jpeg, .png, .webp'
            className='input-field'
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
            }}
          />
          {filename === "No selected file" ? (
            <>
              <Icon icon='ic:round-cloud-upload' color='#1191ff' width='60' />
              <p className='text-main'>Click here to upload</p>
            </>
          ) : (
            <h1>{filename}</h1>
          )}

          <button
            type='submit'
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ backgroundColor: currentColor }}
            className='absolute bottom-12 right-10 md:right-20 text-white p-2 hover:drop-shadow-xl rounded-md capitalize'
          >
            submit
          </button>
        </form>
        <section className='my-3 flex items-center py-4 px-5 rounded-md bg-slate-300 dark:bg-main-dark-bg w-80 md:w-400'>
          <Icon icon='pepicons-print:cv' color='#1191ff' width={30} />
          <h1 className='text-dark dark:text-lightOne'>
            - {filename ?? "No selected file"}
          </h1>
        </section>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UploadPdf;
