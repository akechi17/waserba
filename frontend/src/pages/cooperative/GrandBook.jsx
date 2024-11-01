import React, { useEffect, useState } from "react";
import { Alert, Header, Select2 } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import Select from "react-select";

const GrandBook = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber, formatDate } =
    useStateContext();
  const [estimation, setEstimation] = useState("1-110");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: journals,
    isLoading,
    refetch,
  } = useQuery("books", async () => {
    const response = await axiosClient.get(`/books/${estimation}`);
    return response.data;
  });

  const { data: estimations } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });

  const dataPerPage = 10;

  const mergedData =
    me?.role === "admin" && journals?.estimations && journals?.journals
      ? [...journals.estimations, ...journals.journals]
      : journals?.journals
      ? [...journals.journals]
      : [];

  const pageCount = Math.ceil(mergedData.length / dataPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const slicedData = mergedData.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const debitSum = journals?.journals.reduce((sum, data) => {
    if (data.balance === "debit") {
      return sum + Number(data.initial_balance || 0);
    }
    return sum;
  }, 0);

  const kreditSum = journals?.journals.reduce((sum, data) => {
    if (data.balance === "kredit") {
      return sum + Number(data.initial_balance || 0);
    }
    return sum;
  }, 0);

  useEffect(() => {
    if (message || errors) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setErrors(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, errors]);

  useEffect(() => {
    if (estimation) {
      refetch();
    }
  }, [estimation]);

  const estimationOptions = estimations
    ? estimations.map((e) => ({
        value: e.id,
        label: e.id + " | " + e.name,
      }))
    : [];

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <div className='flex justify-between'>
        <Header category='Buku' title='Besar' />
        <div className='flex flex-col justify-center items-start text-sm md:text-lg font-bold gap-3'>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Total Debit : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? 'Loading...' : formatNumber(debitSum)}
            </h1>
          </div>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Total Kredit : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? 'Loading...' : formatNumber(kreditSum)}
            </h1>
          </div>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Selisih : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? 'Loading...' : formatNumber(debitSum - kreditSum)}
            </h1>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full my-5 flex items-center justify-end'>
              <Select
                value={estimationOptions.find(
                  (option) => option.value === estimation
                )}
                onChange={(selectedOption) => {
                  setEstimation(selectedOption ? selectedOption.value : "");
                }}
                isClearable={true}
                isSearchable={true}
                options={estimationOptions}
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200 text-center'>
                  <th>Tanggal Dibuat</th>
                  <th>Nomor Bukti</th>
                  <th>Nama</th>
                  <th>Nomor Pemilik</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                </tr>
              </thead>
              <tbody>
                {slicedData.length === 0 ? (
                  <tr className="text-center font-bold text-xl text-black">
                    <td colSpan='5'>No Data</td>
                  </tr>
                ) : (
                  slicedData.map((item) => (
                    <tr
                      className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 text-center'
                      key={item.id}
                    >
                      <td>{formatDate(item?.created_at)}</td>
                      <td>BM</td>
                      <td>{item.user?.name}</td>
                      <td>{item.user_id}</td>
                      <td>
                        {item?.balance === "debit" &&
                          formatNumber(item?.initial_balance)}
                      </td>
                      <td>
                        {item?.balance === "kredit" &&
                          formatNumber(item?.initial_balance)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total Jurnal: {mergedData.length}</p>
              <p>
                Page: {currentPage + 1} of {pageCount}
              </p>
            </div>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              pageLinkClassName={"pagination__link"}
              activeLinkClassName={"pagination__link--active"}
              breakClassName={"pagination__break"}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
            />
          </div>
        </>
      )}
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

export default GrandBook;
