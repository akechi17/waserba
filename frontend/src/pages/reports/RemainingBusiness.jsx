import React, { createRef, useEffect, useState } from "react";
import { Alert, Header, InputText, TelephoneInput } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const RemainingBusiness = () => {
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: pastProfits, isLoading } = useQuery("pastProfits", async () => {
    const response = await axiosClient.get("/past-profits");
    return response.data.past_profits;
  });
  const { data: policy } = useQuery("policy", async () => {
    const response = await axiosClient.get("/policies");
    return response.data.policy;
  });

  const nameRef = createRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    pastProfits?.length ? pastProfits.length / dataPerPage : 5 / dataPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedData = pastProfits?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };
    updateJournalMutation.mutate(payload);
    document.getElementById("add").close();
  };

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
      <Header category='Laporan' title='SHU Bagian Anggota' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end'>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs text-center'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-aagray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th rowSpan={2}>Nomor Anggota</th>
                  <th rowSpan={2}>Nama</th>
                  <th colSpan={2}>Laba Yang Lalu (2021)</th>
                  <th rowSpan={2}>Total Laba Yang Lalu (2021)</th>
                  <th colSpan={2}>Mutasi Laba (2022)</th>
                  <th rowSpan={2}>Total Mutasi Laba</th>
                  <th colSpan={2}>Total Laba</th>
                  <th rowSpan={2}>Total Laba Bagian Pemilik</th>
                  <th rowSpan={2}>Kelola</th>
                </tr>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Modal</th>
                  <th>Transaksi</th>
                  <th>Modal</th>
                  <th>Transaksi</th>
                  <th>Modal</th>
                  <th>Transaksi</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((data) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'
                    key={data.id}
                  >
                    <td>{data.user?.id}</td>
                    <td>{data.user?.name}</td>
                    <td>{formatNumber(data.modal || "-")}</td>
                    <td>{formatNumber(data.transaksi || "-")}</td>
                    <td>{formatNumber(data.modal + data.transaksi || "-")}</td>
                    <td>
                      {formatNumber(
                        Math.round(
                          data.user?.modal *
                            ((policy?.modal / 100) *
                              ((policy?.pemilik / 100) * policy?.phu_comp))
                        ) || "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(Math.round(data.user?.transaksi) || "-")}
                    </td>
                    <td>
                      {formatNumber(
                        Math.round(data.user?.modal + data.user?.transaksi) ||
                          "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        Math.round(data.modal + data.user?.modal) || "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        Math.round(data.transaksi + data.user?.transaksi) || "-"
                      )}
                    </td>
                    <td>
                      {formatNumber(
                        Math.round(
                          data.modal +
                            data.user?.modal +
                            (data.transaksi + data.user?.transaksi)
                        ) || "-"
                      )}
                    </td>
                    <td>
                      <div className='flex items-center justify-center gap-2'>
                        <Link
                          className='btn btn-info btn-square btn-sm'
                          title='Edit'
                        >
                          <Icon
                            icon='bi:pencil-square'
                            color='#fff'
                            width='20'
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total data: {pastProfits?.length}</p>
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
      <dialog id='add' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              Tambah Member
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Nama Lengkap'
              name='name'
              type='text'
              innerRef={nameRef}
              placeholder={"Masukkan Nama Lengkap"}
            />
            <button
              type='submit'
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("notifications").close();
              }}
              className='text-white p-2 hover:drop-shadow-xl rounded-md capitalize'
              style={{ backgroundColor: currentColor }}
            >
              submit
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </div>
  );
};

export default RemainingBusiness;
