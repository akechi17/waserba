import React, { useEffect, useState } from "react";
import { Alert, Header, InputText, Select, Select2 } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt";

const Journal = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber, formatDate } =
    useStateContext();
  const { data: journals, isLoading } = useQuery("journals", async () => {
    const response = await axiosClient.get("/journals");
    return response.data;
  });
  const { data: estimations } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
  const { data: members } = useQuery("members", async () => {
    const response = await axiosClient.get("/members");
    return response.data.members;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [created, setCreated] = useState("");
  const [estimation, setEstimation] = useState("");
  const [member, setMember] = useState("");
  const [balance, setBalance] = useState("");
  const [initial, setInitial] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const mergedData =
    me?.role === "admin" && journals?.estimations && journals?.journals
      ? [...journals.estimations, ...journals.journals]
      : journals?.journals
      ? [...journals.journals]
      : [];

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

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      created_at: created,
      estimation_id: estimation,
      user_id: member,
      balance: balance,
      initial_balance: initial,
    };

    if (selectedData) {
      axiosClient
        .put(`/journals/${selectedData}`, payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("journals");
          setMessage(data.message);
          setSelectedData(null);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/journals", payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("journals");
          setMessage(data.message);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.data && response.data.errors) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const onDelete = (id) => {
    axiosClient
      .delete(`/journals/${id}`)
      .then(({ data }) => {
        setMessage(data.message);
        queryClient.invalidateQueries("journals");
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          setErrors(response.data.errors);
        }
      });
  };

  const handleEditClick = (estimation) => {
    setCreated(estimation.created_at || "");
    setSelectedData(estimation.id);
    setEstimation(estimation.estimation_id || "");
    setMember(estimation.user_id || "");
    setBalance(estimation.balance || "");
    setInitial(estimation.initial_balance || "");
    document.getElementById("form").showModal();
  };

  const handleAddClick = () => {
    setCreated("");
    setSelectedData(null);
    setEstimation("");
    setMember("");
    setBalance("");
    setInitial("");
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

  const estimationOptions = estimations
    ? estimations.map((e) => ({
        value: e.id,
        label: e.id + " | " + e.name,
      }))
    : [];

  const memberOptions = members
    ? members.map((m) => ({
        value: m.id,
        label: m.name,
      }))
    : [];

  DataTable.use(DT);

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <div className='flex justify-between'>
        <Header category='Jurnal' title='Umum' />
        <div className='flex flex-col justify-center items-start text-sm md:text-lg font-bold gap-3'>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Total Debit : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? "Loading..." : formatNumber(debitSum)}
            </h1>
          </div>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Total Kredit : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? "Loading..." : formatNumber(kreditSum)}
            </h1>
          </div>
          <div className='flex items-center'>
            <h3 className='w-24 md:w-32'>Selisih : </h3>
            <h1
              style={{ backgroundColor: currentColor }}
              className='p-2 rounded-xl text-black'
            >
              {isLoading ? "Loading..." : formatNumber(debitSum - kreditSum)}
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
            <div className='w-full h-10 flex items-center justify-end'>
              {me?.role === "admin" && (
                <button
                  className='btn btn-outline btn-info btn-sm text-white font-bold capitalize'
                  onClick={handleAddClick}
                >
                  Tambah Jurnal
                </button>
              )}
            </div>
          </div>
          <div className='overflow-x-auto'>
            <DataTable
              options={{ responsive: true }}
              className='table table-xs'
            >
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>Tanggal Dibuat</th>
                  <th>Kode Pelanggan</th>
                  <th>No. Jurnal</th>
                  <th>Nama Jurnal</th>
                  <th>No. Anggota</th>
                  <th>Nama Anggota</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  {me?.role === "admin" && <th>Kelola</th>}
                </tr>
              </thead>
              <tbody>
                {mergedData.map((item) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'
                    key={item.id}
                  >
                    <td>{formatDate(item?.created_at)}</td>
                    <td>
                      {item.estimation
                        ? `${item.estimation?.id}-${item.user?.id || ""}`
                        : `${item.id}-`}
                    </td>
                    <td>{item.estimation_id || item.id}</td>
                    <td>{item.estimation?.name || item.name}</td>
                    <td>{item.user_id}</td>
                    <td>{item.user?.name}</td>
                    <td>
                      {item?.balance === "debit" &&
                        formatNumber(item?.initial_balance)}
                    </td>
                    <td>
                      {item?.balance === "kredit" &&
                        formatNumber(item?.initial_balance)}
                    </td>
                    <td className='h-10'>
                      {me?.role === "admin" && item.estimation_id && (
                        <div className='flex items-center gap-2'>
                          <button
                            className='btn btn-info btn-square btn-sm'
                            title='Edit'
                            onClick={() => handleEditClick(item)}
                          >
                            <Icon
                              icon='bi:pencil-square'
                              color='#fff'
                              width='20'
                            />
                          </button>
                          <button
                            className='btn btn-error btn-square btn-sm'
                            title='Hapus'
                            onClick={() => onDelete(item.id)}
                          >
                            <Icon icon='bi:trash' color='#fff' width='20' />
                          </button>
                        </div>
                      )}
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
              {selectedData ? "Edit Jurnal" : "Tambah Jurnal"}
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Tanggal Dibuat'
              name='created_at'
              type='date'
              value={created}
              onChange={(e) => setCreated(e.target.value)}
              placeholder={"Masukkan Tanggal Dibuat"}
            />
            <Select2
              label='Nama Perkiraan'
              options={estimationOptions}
              value={estimation}
              onChange={(e) => setEstimation(e.target.value)}
            />
            <Select2
              label='Nama Member'
              options={memberOptions}
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />
            <Select
              label='Saldo Normal'
              options={["debit", "kredit"]}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
            <InputText
              label='Nominal'
              name='initial'
              type='text'
              placeholder={"Masukkan Nominal"}
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
            {errors && (
              <div className='flex justify-start w-full'>
                <Alert message={errors} type='error' />
              </div>
            )}
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

export default Journal;
