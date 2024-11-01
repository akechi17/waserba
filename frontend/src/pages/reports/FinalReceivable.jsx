import React, { useEffect, useState } from "react";
import { Alert, Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Receivables = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: receivables, isLoading } = useQuery("receivables", async () => {
    const response = await axiosClient.get("/receivables");
    return response.data.receivables;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    receivables?.length ? receivables.length / dataPerPage : 5 / dataPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const totalMusyarakah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_musyarakah || 0),
    0
  );
  const totalMudharabah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_mudharabah || 0),
    0
  );
  const totalMurabahah = receivables?.reduce(
    (acc, curr) => acc + (curr?.total_murabahah || 0),
    0
  );
  const slicedData = receivables?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Piutang Akhir' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end'></div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs text-center'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th rowSpan={3}>No. Anggota</th>
                  <th rowSpan={3}>Nama Anggota</th>
                  <th colSpan={3}>Piutang</th>
                  <th rowSpan={3}>Jumlah Piutang</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Piutang Usaha musyarakah</th>
                  <th>Piutang Usaha Mudharabah</th>
                  <th>Piutang Usaha Murabahah</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>1-120</th>
                  <th>1-121</th>
                  <th>1-122</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'
                    key={data.id}
                  >
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{formatNumber(data?.total_musyarakah)}</td>
                    <td>{formatNumber(data?.total_mudharabah)}</td>
                    <td>{formatNumber(data?.total_murabahah)}</td>
                    <td>
                      {formatNumber(
                        (data?.total_musyarakah || 0) +
                          (data?.total_mudharabah || 0) +
                          (data?.total_murabahah || 0)
                      )}
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total</td>
                  <td>{formatNumber(totalMusyarakah)}</td>
                  <td>{formatNumber(totalMudharabah)}</td>
                  <td>{formatNumber(totalMurabahah)}</td>
                  <td>
                    {formatNumber(
                      totalMusyarakah + totalMudharabah + totalMurabahah
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total Member: {receivables?.length}</p>
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

export default Receivables;
