import React, { useState } from "react";
import { Header } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const WorkSheet = () => {
  const { activeMenu, formatNumber } = useStateContext();
  const { data: estimations, isLoading } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
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

  const sumColumns = (columnKey, balanceType, idPrefixes = []) => {
    return estimations?.reduce((sum, data) => {
      const matchesPrefix =
        idPrefixes.length === 0 ||
        idPrefixes.some((prefix) => data.id.startsWith(prefix));
      if (matchesPrefix && data.balance === balanceType) {
        return sum + Number(data[columnKey] || 0); // Ensure data[columnKey] is a number
      } else {
        return sum;
      }
    }, 0);
  };

  const sumNeracaSaldoDebit = sumColumns("neraca_saldo", "debit");
  const sumNeracaSaldoKredit = sumColumns("neraca_saldo", "kredit");
  const sumPHUDebit = sumColumns("neraca_saldo", "debit", ["4", "5"]);
  const sumPHUKredit = sumColumns("neraca_saldo", "kredit", ["4", "5"]);
  const sumNeracaDebit = sumColumns("neraca_saldo", "debit", ["1", "2", "3"]);
  const sumNeracaKredit = sumColumns("neraca_saldo", "kredit", ["1", "2", "3"]);
  const labaPHUDebit =
    sumPHUDebit < sumPHUKredit ? sumPHUKredit - sumPHUDebit : 0;
  const labaPHUKredit =
    sumPHUKredit < sumPHUDebit ? sumPHUDebit - sumPHUKredit : 0;
  const labaNeracaDebit =
    sumNeracaDebit < sumNeracaKredit ? sumNeracaKredit - sumNeracaDebit : 0;
  const labaNeracaKredit =
    sumNeracaKredit < sumNeracaDebit ? sumNeracaDebit - sumNeracaKredit : 0;

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Neraca Lajur' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end gap-3'>
              <Link
                to='/laporan-neraca'
                className='btn btn-outline btn-info btn-sm hover:text-white font-bold capitalize'
              >
                Laporan Neraca
              </Link>
              <Link
                to='/laporan-phu'
                className='btn btn-outline btn-info btn-sm hover:text-white font-bold capitalize'
              >
                Laporan PHU
              </Link>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs text-center'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th rowSpan={2}>No. Perkiraan</th>
                  <th rowSpan={2}>Nama Perkiraan</th>
                  <th colSpan={2}>Neraca Saldo</th>
                  <th colSpan={2}>Jurnal Penyesuaian</th>
                  <th colSpan={2}>Neraca Saldo Penyesuaian</th>
                  <th colSpan={2}>Perhitungan Hasil Usaha</th>
                  <th colSpan={2}>Neraca</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th>Debit</th>
                  <th>Kredit</th>
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
                    <td>
                      {formatNumber(
                        data.balance === "debit" ? data.neraca_saldo : "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        data.balance === "kredit" ? data.neraca_saldo : "-"
                      )}
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {formatNumber(
                        data.balance === "debit" ? data.neraca_saldo : "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        data.balance === "kredit" ? data.neraca_saldo : "-"
                      )}
                    </td>
                    <td>
                      {(data.id.startsWith("4") || data.id.startsWith("5")) &&
                      data.balance === "debit"
                        ? formatNumber(data.neraca_saldo)
                        : "-"}
                    </td>
                    <td>
                      {(data.id.startsWith("4") || data.id.startsWith("5")) &&
                      data.balance === "kredit"
                        ? formatNumber(data.neraca_saldo)
                        : "-"}
                    </td>
                    <td>
                      {(data.id.startsWith("1") ||
                        data.id.startsWith("2") ||
                        data.id.startsWith("3")) &&
                      data.balance === "debit"
                        ? formatNumber(data.neraca_saldo)
                        : "-"}
                    </td>
                    <td>
                      {(data.id.startsWith("1") ||
                        data.id.startsWith("2") ||
                        data.id.startsWith("3")) &&
                      data.balance === "kredit"
                        ? formatNumber(data.neraca_saldo)
                        : "-"}
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Jumlah</td>
                  <td>{formatNumber(sumNeracaSaldoDebit || "-")}</td>
                  <td>{formatNumber(sumNeracaSaldoKredit || "-")}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{formatNumber(sumNeracaSaldoDebit || "-")}</td>
                  <td>{formatNumber(sumNeracaSaldoKredit || "-")}</td>
                  <td>{formatNumber(sumPHUDebit || "-")}</td>
                  <td>{formatNumber(sumPHUKredit || "-")}</td>
                  <td>{formatNumber(sumNeracaDebit || "-")}</td>
                  <td>{formatNumber(sumNeracaKredit || "-")}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Laba Kotor</td>
                  <td colSpan={6}></td>
                  <td>{formatNumber(labaPHUDebit || "-")}</td>
                  <td>{formatNumber(labaPHUKredit || "-")}</td>
                  <td>{formatNumber(labaNeracaDebit || "-")}</td>
                  <td>{formatNumber(labaNeracaKredit || "-")}</td>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Jumlah</td>
                  <td colSpan={6}></td>
                  <td>{formatNumber(sumPHUDebit + labaPHUDebit || "-")}</td>
                  <td>{formatNumber(sumPHUKredit + labaPHUKredit || "-")}</td>
                  <td>
                    {formatNumber(sumNeracaDebit + labaNeracaDebit || "-")}
                  </td>
                  <td>
                    {formatNumber(sumNeracaKredit + labaNeracaKredit || "-")}
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

export default WorkSheet;
