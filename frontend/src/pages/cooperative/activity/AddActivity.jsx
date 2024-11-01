import React from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { Header } from "../../../components";

const AddActivity = () => {
  const { activeMenu } = useStateContext();

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <div className='flex justify-center'>
        <Header title='Kegiatan Koperasi' />
      </div>
      <div className='flex w-full justify-center flex-wrap'>
        <div className='w-full h-10 flex items-center justify-end'></div>
      </div>
    </div>
  );
};

export default AddActivity;
