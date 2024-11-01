import React, { useEffect, useState } from "react";
import { Alert, Header, InputText } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt";

const RemainingBusiness = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: pastProfits, isLoading } = useQuery("pastProfits", async () => {
    const response = await axiosClient.get("/past-profits");
    return response.data.past_profits;
  });
  const { data: policy } = useQuery("policy", async () => {
    const response = await axiosClient.get("/policies");
    return response.data.policy;
  });

  const [selectedData, setSelectedData] = useState(null);
  const [modal, setModal] = useState("");
  const [transaksi, setTransaksi] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      modal,
      transaksi
    };
    axiosClient
      .put(`/past-profits/${selectedData}`, payload)
      .then(({ data }) => {
        queryClient.invalidateQueries("pastProfits");
        setMessage(data.message);
        setSelectedData(null);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setError(response.data.errors);
        }
      });
  };

  const handleEditClick = (data) => {
    setSelectedData(data.id);
    setModal(data.modal || "");
    setTransaksi(data.transaksi || "");
    document.getElementById("form").showModal();
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  DataTable.use(DT);

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
            <div className='w-full h-10 flex items-center justify-end'></div>
          </div>
          <div className='overflow-x-auto'>
            <DataTable
              options={{ responsive: true }}
              className='table table-xs text-center'
            >
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
                {pastProfits?.map((data) => (
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
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </div>
        </>
      )}
      <dialog id='form' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              Edit Laba Yang Lalu
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Modal'
              name='modal'
              type='text'
              value={modal}
              onChange={(e) => setModal(e.target.value)}
              placeholder={"Masukkan Modal"}
            />
            <InputText
              label='Transaksi'
              name='transaksi'
              type='text'
              value={transaksi}
              onChange={(e) => setTransaksi(e.target.value)}
              placeholder={"Masukkan Transaksi"}
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
          <button>Close</button>
        </form>
      </dialog>
      {message && <Alert text={message} />}
      {error && <Alert text={error} error />}
    </div>
  );
};

export default RemainingBusiness;
