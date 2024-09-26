import React, { useEffect, useState } from "react";
import { Alert, Header, InputText } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Equity = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: equities, isLoading } = useQuery("equities", async () => {
    const response = await axiosClient.get("/equities");
    return response.data.equities;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [pokok, setPokok] = useState("");
  const [wajib, setWajib] = useState("");
  const [modal, setModal] = useState("");
  const [sukarela, setSukarela] = useState("");
  const [qard, setQard] = useState("");
  const [wadiah, setWadiah] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    equities?.length ? equities.length / dataPerPage : 5 / dataPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedData = equities?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );

  const pokokSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.pokok || 0);
  }, 0);
  const wajibSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.wajib || 0);
  }, 0);
  const modalSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.modal_penyertaan || 0);
  }, 0);
  const sukarelaSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.sukarela || 0);
  }, 0);
  const qardSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.qard_rahn || 0);
  }, 0);
  const wadiahSum = equities?.reduce((sum, data) => {
    return sum + Number(data.equities[0]?.wadiah || 0);
  }, 0);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      pokok: pokok,
      wajib: wajib,
      modal_penyertaan: modal,
      sukarela: sukarela,
      qard_rahn: qard,
      wadiah: wadiah,
    };

    if (selectedData) {
      axiosClient
        .put(`/equities/${selectedData}`, payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("equities");
          setMessage(data.message);
          setSelectedData(null);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleEditClick = (data) => {
    setSelectedData(data.equities[0].id);
    setPokok(data.equities[0]?.pokok || "");
    setWajib(data.equities[0]?.wajib || "");
    setModal(data.equities[0]?.modal_penyertaan || "");
    setSukarela(data.equities[0]?.sukarela || "");
    setQard(data.equities[0]?.qard_rahn || "");
    setWadiah(data.equities[0]?.wadiah || "");
    document.getElementById("form").showModal();
  };

  useEffect(() => {
    if (message || errors) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setErrors(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, errors]);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Laporan' title='Awal Ekuitas' />
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
                  <th rowSpan={3}>Nama</th>
                  <th colSpan={3}>Simpanan Menentukan Kepemilikan</th>
                  <th rowSpan={3}>
                    <div>Jumlah Simpanan</div>
                    <div>Menentukan Kepemilikan</div>
                  </th>
                  <th colSpan={4}>Simpanan Tidak Menentukan Kepemilikan</th>
                  <th rowSpan={3}>
                    <div>Jumlah Simpanan Tidak</div>
                    <div>Menentukan Kepemilikan</div>
                  </th>
                  <th rowSpan={3}>Total Simpanan</th>
                  {me?.role === "admin" && <th rowSpan={3}>Kelola</th>}
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
                {slicedData?.map((data) => {
                  const owned =
                    Number(data.equities[0]?.pokok || 0) +
                    Number(data.equities[0]?.wajib || 0) +
                    Number(data.equities[0]?.modal_penyertaan || 0);

                  const notOwned =
                    Number(data.equities[0]?.sukarela || 0) +
                    Number(data.equities[0]?.qard_rahn || 0) +
                    Number(data.equities[0]?.wadiah || 0) +
                    Number(data.equities[0]?.modal_penyertaan || 0);
                  return (
                    <tr
                      key={data.id}
                      className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'
                    >
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{formatNumber(data.equities[0]?.pokok || "-")}</td>
                      <td>{formatNumber(data.equities[0]?.wajib || "-")}</td>
                      <td>
                        {formatNumber(
                          data.equities[0]?.modal_penyertaan || "-"
                        )}
                      </td>
                      <td>{formatNumber(owned || "-")}</td>
                      <td>{formatNumber(data.equities[0]?.sukarela || "-")}</td>
                      <td>
                        {formatNumber(data.equities[0]?.qard_rahn || "-")}
                      </td>
                      <td>{formatNumber(data.equities[0]?.wadiah || "-")}</td>
                      <td>
                        {formatNumber(
                          data.equities[0]?.modal_penyertaan || "-"
                        )}
                      </td>
                      <td>{formatNumber(notOwned || "-")}</td>
                      <td>{formatNumber(owned + notOwned || "-")}</td>
                      {me?.role === "admin" && (
                        <td>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              className='btn btn-info btn-square btn-sm'
                              title='Edit'
                              onClick={() => handleEditClick(data)}
                            >
                              <Icon
                                icon='bi:pencil-square'
                                color='#fff'
                                width='20'
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total</td>
                  <td>{formatNumber(pokokSum || "-")}</td>
                  <td>{formatNumber(wajibSum || "-")}</td>
                  <td>{formatNumber(modalSum || "-")}</td>
                  <td>{formatNumber(pokokSum + wajibSum + modalSum || "-")}</td>
                  <td>{formatNumber(sukarelaSum || "-")}</td>
                  <td>{formatNumber(qardSum || "-")}</td>
                  <td>{formatNumber(wadiahSum || "-")}</td>
                  <td>{formatNumber(modalSum || "-")}</td>
                  <td>
                    {formatNumber(
                      sukarelaSum + qardSum + wadiahSum + modalSum || "-"
                    )}
                  </td>
                  <td>
                    {formatNumber(
                      (pokokSum + wajibSum + modalSum || 0) +
                        (sukarelaSum + qardSum + wadiahSum + modalSum || 0) ||
                        "-"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total Member: {equities?.length}</p>
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
      <dialog id='form' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              Edit Laporan Awal Ekuitas
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Simpanan Pokok'
              name='pokok'
              type='number'
              placeholder={"Masukkan Simpanan Pokok"}
              value={pokok}
              onChange={(e) => setPokok(Number(e.target.value))}
            />
            <InputText
              label='Simpanan Wajib'
              name='wajib'
              type='number'
              placeholder={"Masukkan Simpanan Wajib"}
              value={wajib}
              onChange={(e) => setWajib(Number(e.target.value))}
            />
            <InputText
              label='Modal Penyertaan'
              name='modal'
              type='number'
              placeholder={"Masukkan Modal Penyertaan"}
              value={modal}
              onChange={(e) => setModal(Number(e.target.value))}
            />
            <InputText
              label='Simpanan Sukarela'
              name='sukarela'
              type='number'
              placeholder={"Masukkan Simpanan Sukarela"}
              value={sukarela}
              onChange={(e) => setSukarela(Number(e.target.value))}
            />
            <InputText
              label='Tabungan Qard/Rahn'
              name='qard'
              type='number'
              placeholder={"Masukkan Tabungan Qard/Rahn"}
              value={qard}
              onChange={(e) => setQard(Number(e.target.value))}
            />
            <InputText
              label='Tabungan Wadiah'
              name='wadiah'
              type='number'
              placeholder={"Masukkan Tabungan Wadiah"}
              value={wadiah}
              onChange={(e) => setWadiah(Number(e.target.value))}
            />
            <div className='modal-action'>
              <button
                type='submit'
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("form").close();
                }}
                className='text-white p-2 hover:drop-shadow-xl rounded-md capitalize'
                style={{ backgroundColor: currentColor }}
              >
                submit
              </button>
            </div>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
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

export default Equity;
