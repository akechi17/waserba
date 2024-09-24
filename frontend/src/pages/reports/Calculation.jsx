import React, { useState } from "react";
import { Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const Calculation = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: estimations, isLoading } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const filteredEstimations = estimations?.filter(
    (data) => data.id.startsWith("4") || data.id.startsWith("5")
  );

  const pageCount = Math.ceil(
    filteredEstimations?.length ? filteredEstimations.length / dataPerPage : 0
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const slicedData = filteredEstimations?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const totalPendapatan = filteredEstimations?.reduce((sum, data) => {
    const value =
      data.id.startsWith("4") && data.balance === "kredit"
        ? data.neraca_saldo
        : 0;
    return sum + Number(value);
  }, 0);

  const totalBiaya = filteredEstimations?.reduce((sum, data) => {
    const value =
      data.id.startsWith("5") && data.balance === "debit"
        ? data.neraca_saldo
        : 0;
    return sum + Number(value);
  }, 0);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Perhitungan Hasil Usaha' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end gap-3'>
              <Link
                to='/neraca-lajur'
                className='btn btn-outline btn-info btn-sm hover:text-white font-bold capitalize'
              >
                Neraca Lajur
              </Link>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs text-center'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th rowSpan={2}>Nomor Perkiraan</th>
                  <th rowSpan={2}>Nama Perkiraan</th>
                  <th colSpan={2}>Tahun Buku 2024</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 h-10'
                    key={data.id}
                  >
                    <td className='w-32'>{data.id}</td>
                    <td className='text-start w-60'>{data.name}</td>
                    <td>{formatNumber(data.neraca_saldo || "-")}</td>
                  </tr>
                ))}
                <tr></tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Pendapatan</td>
                  <td colSpan={2}>{formatNumber(totalPendapatan)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Biaya</td>
                  <td colSpan={2}>{formatNumber(totalBiaya)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Laba Sebelum Pajak</td>
                  <td colSpan={2}>
                    {formatNumber(totalPendapatan - totalBiaya)}
                  </td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Pajak</td>
                  <td colSpan={2}>-</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Laba Setelah Pajak</td>
                  <td colSpan={2}>
                    {formatNumber(totalPendapatan - totalBiaya)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
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
    </div>
  );
};

export default Calculation;
