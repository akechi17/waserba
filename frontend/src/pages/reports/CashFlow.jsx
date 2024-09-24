import React, { useEffect, useState } from "react";
import { Alert, Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const CashFlow = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: estimations, isLoading } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
  const [isPenerimaan, setIsPenerimaan] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    estimations?.length ? estimations.length / dataPerPage : 5 / dataPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const slicedData = estimations?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const totalPenerimaan = estimations?.reduce(
    (total, data) => total + parseFloat(data.mutasi_kredit || 0),
    0
  );
  const totalPengeluaran = estimations?.reduce(
    (total, data) => total + parseFloat(data.mutasi_debit || 0),
    0
  );
  const saldoAwal =
    estimations?.find((data) => data.id === "1-110")?.initial_balance || 0;

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Arus Kas' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end gap-3'>
              <button
                onClick={() => setIsPenerimaan(true)}
                className={`btn ${
                  isPenerimaan ? "" : "btn-outline"
                } btn-info btn-sm hover:text-white font-bold capitalize`}
              >
                Penerimaan
              </button>
              <button
                onClick={() => setIsPenerimaan(false)}
                className={`btn ${
                  isPenerimaan ? "btn-outline" : ""
                } btn-info btn-sm hover:text-white font-bold capitalize`}
              >
                Pengeluaran
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs text-center'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th rowSpan={2} className="w-20">No. Perkiraan</th>
                  <th rowSpan={2} className="w-64">Nama Perkiraan</th>
                  <th>Tahun Buku 2024</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 h-10'>
                  <td></td>
                  <td>Saldo awal kas</td>
                  <td>{formatNumber(saldoAwal)}</td>
                </tr>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 h-10'
                    key={data.id}
                  >
                    <td>{data.id}</td>
                    <td className="text-start">{data.name}</td>
                    <td>
                      {formatNumber(
                        isPenerimaan ? data?.mutasi_kredit : data?.mutasi_debit
                      )}
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Penerimaan</td>
                  <td>{formatNumber(totalPenerimaan)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total Pengeluaran</td>
                  <td>{formatNumber(totalPengeluaran)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Saldo Kas Awal Tahun</td>
                  <td>{formatNumber(saldoAwal)}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Saldo Kas Akhir Tahun</td>
                  <td></td>
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
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </div>
  );
};

export default CashFlow;
