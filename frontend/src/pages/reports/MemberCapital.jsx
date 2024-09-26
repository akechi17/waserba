import React, { useEffect, useState } from "react";
import { Alert, Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const MemberCapital = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: members, isLoading } = useQuery("members", async () => {
    const response = await axiosClient.get("/members");
    return response.data.members;
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    members?.length ? members.length / dataPerPage : 5 / dataPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedData = members?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const calculateTotals = (members) => {
    return members.reduce(
      (totals, member) => {
        totals.sim_pok += member.sim_pok || 0;
        totals.sim_waj += member.sim_waj || 0;
        totals.sim_wakhusus += member.sim_wakhusus || 0;
        totals.sim_suk += member.sim_suk || 0;
        totals.taqurban += member.taqurban || 0;
        totals.tab_lain += member.tab_lain || 0;

        totals.jumlah_setoran_menentukan_kepemilikan +=
          Number(member.sim_pok || 0) +
          Number(member.sim_waj || 0) +
          Number(member.sim_wakhusus || 0);

        totals.jumlah_setoran_tidak_menentukan_kepemilikan +=
          Number(member.sim_suk || 0) +
          Number(member.taqurban || 0) +
          Number(member.tab_lain || 0) +
          Number(member.sim_wakhusus || 0);

        return totals;
      },
      {
        sim_pok: 0,
        sim_waj: 0,
        sim_wakhusus: 0,
        sim_suk: 0,
        taqurban: 0,
        tab_lain: 0,
        jumlah_setoran_menentukan_kepemilikan: 0,
        jumlah_setoran_tidak_menentukan_kepemilikan: 0,
        total_setoran: 0,
      }
    );
  };

  const totals = members ? calculateTotals(members) : {};

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
      <Header category='Laporan' title='Modal Anggota Akhir' />
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
                  <th rowSpan={3}>Nomor Anggota</th>
                  <th rowSpan={3}>Nama</th>
                  <th colSpan={3}>Setoran Menentukan Kepemilikan</th>
                  <th rowSpan={3}>Jumlah Setoran Menentukan Kepemilikan</th>
                  <th colSpan={4}>Setoran Tidak Menentukan Kepemilikan</th>
                  <th rowSpan={3}>
                    Jumlah Setoran Tidak Menentukan Kepemilikan
                  </th>
                  <th rowSpan={3}>Total Setoran</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Simpanan Pokok</th>
                  <th>Simpanan Wajib</th>
                  <th>Modal Penyertaan</th>
                  <th>Simpanan Sukarela</th>
                  <th>Tabungan Qard/Rahn</th>
                  <th>Tabungan Wadiah</th>
                  <th>Modal Penyertaan</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>3-110</th>
                  <th>3-120</th>
                  <th>2-320</th>
                  <th>2-110</th>
                  <th>2-132</th>
                  <th>2-121</th>
                  <th>2-320</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 h-10'
                    key={data.id}
                  >
                    <td>{data.id}</td>
                    <td className='text-start'>{data.name}</td>
                    <td>{formatNumber(data?.sim_pok || "-")}</td>
                    <td>{formatNumber(data?.sim_waj || "-")}</td>
                    <td>{formatNumber(data?.sim_wakhusus || "-")}</td>
                    <td>
                      {formatNumber(
                        data?.sim_pok + data?.sim_waj + data?.sim_wakhusus ||
                          "-"
                      )}
                    </td>
                    <td>{formatNumber(data?.sim_suk || "-")}</td>
                    <td>{formatNumber(data?.taqurban || "-")}</td>
                    <td>{formatNumber(data?.tab_lain || "-")}</td>
                    <td>{formatNumber(data?.sim_wakhusus || "-")}</td>
                    <td>
                      {formatNumber(
                        data?.sim_suk +
                          data?.taqurban +
                          data?.tab_lain +
                          data.sim_wakhusus || "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        data?.sim_pok +
                          data?.sim_waj +
                          data?.sim_suk +
                          data?.taqurban +
                          data?.tab_lain +
                          data.sim_wakhusus || "-"
                      )}
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total</td>
                  <td>{formatNumber(totals.sim_pok || "-")}</td>
                  <td>{formatNumber(totals.sim_waj || "-")}</td>
                  <td>{formatNumber(totals.sim_wakhusus || "-")}</td>
                  <td>
                    {formatNumber(
                      totals.jumlah_setoran_menentukan_kepemilikan || "-"
                    )}
                  </td>
                  <td>{formatNumber(totals.sim_suk || "-")}</td>
                  <td>{formatNumber(totals.taqurban || "-")}</td>
                  <td>{formatNumber(totals.tab_lain || "-")}</td>
                  <td>{formatNumber(totals.sim_wakhusus || "-")}</td>
                  <td>
                    {formatNumber(
                      totals.jumlah_setoran_tidak_menentukan_kepemilikan || "-"
                    )}
                  </td>
                  <td>
                    {formatNumber(
                      totals.jumlah_setoran_menentukan_kepemilikan +
                        totals.jumlah_setoran_tidak_menentukan_kepemilikan || "-"
                    )}
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
              breakClassName={"break-me"}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
            />
          </div>
        </>
      )}
      {message && <Alert type='success' message={message} />}
      {error && <Alert type='error' message={error} />}
    </div>
  );
};

export default MemberCapital;
