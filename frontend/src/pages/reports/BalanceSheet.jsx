import React, { useState } from "react";
import { Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const BalanceSheet = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: estimations, isLoading } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;

  const filteredEstimations = estimations?.filter(
    (data) =>
      data.id.startsWith("1") ||
      data.id.startsWith("2") ||
      data.id.startsWith("3")
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

  // Calculate totals based on all filtered data
  const totalAktiva2023 = filteredEstimations?.reduce((sum, data) => {
    const value = data.id.startsWith("1") ? data.initial_balance : 0;
    return sum + Number(value);
  }, 0);

  const totalAktiva2024 = filteredEstimations?.reduce((sum, data) => {
    const value =
      (data.id.startsWith("1") && data.balance === "debit"
        ? data.neraca_saldo
        : 0) -
      (data.id.startsWith("1") && data.balance === "kredit"
        ? data.neraca_saldo
        : 0);
    return sum + Number(value);
  }, 0);

  const totalPassiva2023 = filteredEstimations?.reduce((sum, data) => {
    const value =
      (data.id.startsWith("2") || data.id.startsWith("3")) &&
      data.balance === "kredit"
        ? -data.initial_balance
        : 0;
    return sum + Number(value);
  }, 0);

  const totalPassiva2024 = filteredEstimations?.reduce((sum, data) => {
    const value =
      ((data.id.startsWith("2") || data.id.startsWith("3")) &&
      data.balance === "debit"
        ? data.neraca_saldo
        : 0) -
      (data.id.startsWith("1") && data.balance === "kredit"
        ? data.neraca_saldo
        : 0);
    return sum + Number(value);
  }, 0);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Neraca' />
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
                  <th rowSpan={2} colSpan={2}>
                    Uraian
                  </th>
                  <th>Tahun Buku 2024</th>
                  <th>Tahun Buku 2023</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Jumlah</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 h-10'
                    key={data.id}
                  >
                    <td>{data.id}</td>
                    <td className='text-start w-36'>{data.name}</td>
                    <td>
                      {formatNumber(
                        (data.balance === "debit" ? data.neraca_saldo : 0) -
                          (data.balance === "kredit" ? data.neraca_saldo : 0) ||
                          "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        data.balance === "kredit"
                          ? -data.initial_balance || "-"
                          : data.initial_balance || "-"
                      )}
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Aktiva</td>
                  <td>{formatNumber(totalAktiva2024)}</td>
                  <td>{formatNumber(totalAktiva2023)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Passiva</td>
                  <td>{formatNumber(totalPassiva2024)}</td>
                  <td>{formatNumber(totalPassiva2023)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Selisih</td>
                  <td>{formatNumber(totalAktiva2024 - totalPassiva2024)}</td>
                  <td>{formatNumber(totalAktiva2023 - totalPassiva2023)}</td>
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

export default BalanceSheet;
