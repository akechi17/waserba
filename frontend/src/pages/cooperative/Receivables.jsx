import React, { createRef, useEffect, useState } from "react";
import { Alert, Header, InputText } from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Receivables = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatNumber } = useStateContext();
  const { data: receivables, isLoading } = useQuery("receivables", async () => {
    const response = await axiosClient.get("/receivables");
    return response.data.receivables;
  });
  const [musyarakah, setMusyarakah] = useState("");
  const [mudharabah, setMudharabah] = useState("");
  const [murabahah, setMurabahah] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 10;
  const pageCount = Math.ceil(
    receivables?.length ? receivables.length / dataPerPage : 5 / dataPerPage
  );
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const slicedData = receivables?.slice(
    currentPage * dataPerPage,
    (currentPage + 1) * dataPerPage
  );
  const totalMusyarakah = receivables?.reduce(
    (acc, curr) => acc + (curr.receivables[0]?.musyarakah || 0),
    0
  );
  const totalMudharabah = receivables?.reduce(
    (acc, curr) => acc + (curr.receivables[0]?.mudharabah || 0),
    0
  );
  const totalMurabahah = receivables?.reduce(
    (acc, curr) => acc + (curr.receivables[0]?.murabahah || 0),
    0
  );

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      musyarakah: musyarakah,
      mudharabah: mudharabah,
      murabahah: murabahah,
    };

    if (selectedData) {
      axiosClient
        .put(`/receivables/${selectedData}`, payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("receivables");
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
    setSelectedData(data.receivables[0].id);
    setMusyarakah(data.receivables[0]?.musyarakah || "");
    setMudharabah(data.receivables[0]?.mudharabah || "");
    setMurabahah(data.receivables[0]?.murabahah || "");
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
      <Header category='Piutang' title='Awal' />
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
                  <th rowSpan={3}>Kelola</th>
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
                    <td>
                      {formatNumber(data.receivables[0]?.musyarakah || "-")}
                    </td>
                    <td>
                      {formatNumber(data.receivables[0]?.mudharabah || "-")}
                    </td>
                    <td>
                      {formatNumber(data.receivables[0]?.murabahah || "-")}
                    </td>
                    <td>
                      {formatNumber(
                        (data.receivables[0]?.musyarakah || 0) +
                          (data.receivables[0]?.mudharabah || 0) +
                          (data.receivables[0]?.murabahah || 0) || "-"
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
                <tr className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'>
                  <td colSpan={2}>Total</td>
                  <td>{formatNumber(totalMusyarakah || "-")}</td>
                  <td>{formatNumber(totalMudharabah || "-")}</td>
                  <td>{formatNumber(totalMurabahah || "-")}</td>
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
      <dialog id='form' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              Edit Piutang Awal
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Piutang Usaha Musyarakah'
              name='musyarakah'
              type='number'
              placeholder={"Masukkan Piutang Musyarakah"}
              value={musyarakah}
              onChange={(e) => setMusyarakah(e.target.value)}
            />
            <InputText
              label='Piutang Usaha Mudharabah'
              name='mudharabah'
              type='number'
              placeholder={"Masukkan Piutang Mudharabah"}
              value={mudharabah}
              onChange={(e) => setMudharabah(e.target.value)}
            />
            <InputText
              label='Piutang Usaha Murabahah'
              name='murabahah'
              type='number'
              placeholder={"Masukkan Piutang Murabahah"}
              value={murabahah}
              onChange={(e) => setMurabahah(e.target.value)}
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

export default Receivables;
