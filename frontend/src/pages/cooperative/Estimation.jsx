import React, { useEffect, useState } from "react";
import { Alert, Header, InputText, Select } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Estimation = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: estimations, isLoading } = useQuery("estimations", async () => {
    const response = await axiosClient.get("/estimations");
    return response.data.estimations;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [balance, setBalance] = useState("");
  const [initial, setInitial] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
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

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      id: number,
      name: name,
      group: group,
      balance: balance,
      initial_balance: initial,
    };

    if (selectedData) {
      // Update existing member
      axiosClient
        .put(`/estimations/${selectedData}`, payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("estimations");
          setMessage(data.message);
          setSelectedData(null); // Clear selected member
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      // Add new member
      axiosClient
        .post("/estimations", payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("estimations");
          setMessage(data.message);
        })
        .catch((err) => {
          const response = err.response;
          if (response) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const onDelete = (id) => {
    axiosClient
      .delete(`/estimations/${id}`)
      .then(({ data }) => {
        setMessage(data.message);
        queryClient.invalidateQueries("estimations");
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          setErrors(response.data.errors);
        }
      });
  };

  const handleEditClick = (estimation) => {
    setSelectedData(estimation.id);
    setNumber(estimation.id || "");
    setName(estimation.name || "");
    setGroup(estimation.group || "");
    setBalance(estimation.balance || "");
    setInitial(estimation.initial_balance || "");
    document.getElementById("form").showModal();
  };

  const handleAddClick = () => {
    setSelectedData(null);
    setNumber("");
    setName("");
    setGroup("");
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

  return (
    <div
      className={`m-2 mt-24 md:m-6 p-8 md:p-8 bg-white dark:bg-secondary-dark-bg rounded-3xl transition duration-300 ${
        activeMenu && "md:max-w-5xl"
      }`}
    >
      <Header category='Bagan' title='Perkiraan' />
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
                  Tambah Perkiraan
                </button>
              )}
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>No. Perkiraan</th>
                  <th>Nama Perkiraan</th>
                  <th>Golongan Perkiraan</th>
                  <th>Saldo Normal</th>
                  <th>Neraca Awal</th>
                  {me?.role === "admin" && <th>Kelola</th>}
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((estimation) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200 capitalize'
                    key={estimation.id}
                  >
                    <td>{estimation.id}</td>
                    <td>{estimation.name}</td>
                    <td>{estimation?.group}</td>
                    <td>{estimation?.balance}</td>
                    <td>{formatNumber(estimation?.initial_balance)}</td>
                    {me?.role === "admin" && (
                      <td>
                        <div className='flex items-center gap-2'>
                          <button
                            className='btn btn-info btn-square btn-sm'
                            title='Edit'
                            onClick={() => handleEditClick(estimation)}
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
                            onClick={() => onDelete(estimation.id)}
                          >
                            <Icon icon='bi:trash' color='#fff' width='20' />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total Perkiraan: {estimations?.length}</p>
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
              {selectedData ? "Edit Perkiraan" : "Tambah Perkiraan"}
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='No Perkiraan'
              name='number'
              type='text'
              placeholder={"Masukkan Nomor Perkiraan"}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <InputText
              label='Nama Perkiraan'
              name='name'
              type='text'
              placeholder={"Masukkan Nama Perkiraan"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              label='Golongan'
              options={["harta", "kewajiban", "modal", "pendapatan", "biaya"]}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <Select
              label='Saldo Normal'
              options={["debit", "kredit"]}
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
            <InputText
              label='Neraca Awal'
              name='initial'
              type='number'
              placeholder={"Masukkan Neraca Awal"}
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
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

export default Estimation;
