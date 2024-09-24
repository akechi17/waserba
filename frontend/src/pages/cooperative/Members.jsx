import React, { createRef, useEffect, useState } from "react";
import {
  Alert,
  Header,
  InputText,
  Select,
  TelephoneInput,
} from "../../components";
import ReactPaginate from "react-paginate";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";

const Members = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor } = useStateContext();
  const { data: members, isLoading } = useQuery("members", async () => {
    const response = await axiosClient.get("/members");
    return response.data.members;
  });
  const [selectedData, setSelectedData] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const options = ["admin", "member", "notmember"];
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

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: name,
      phone: phoneNumber,
      role: role,
      address: address,
      city: city,
      postcode: postCode,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    if (selectedData) {
      // Update existing member
      axiosClient
        .put(`/members/${selectedData}`, payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("members");
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
        .post("/auth/adduser", payload)
        .then(({ data }) => {
          queryClient.invalidateQueries("members");
          setMessage(data.message);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleEditClick = (member) => {
    setSelectedData(member.id);
    setName(member.name || "");
    setPhoneNumber(member.phone || "");
    setRole(member.role || "");
    setAddress(member.address || "");
    setCity(member.city || "");
    setPostCode(member.postcode || "");
    document.getElementById("form").showModal();
  };

  const handleAddClick = () => {
    setSelectedData(null);
    setName("");
    setPhoneNumber("62");
    setRole("");
    setAddress("");
    setCity("");
    setPostCode("");
    document.getElementById("form").showModal();
  };

  const handleStatusChange = (id) => {
    axiosClient
      .put(`/member/status/${id}`)
      .then(({ data }) => {
        queryClient.invalidateQueries("members");
        setMessage(data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          setErrors(response.data.message);
        }
      });
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options).replace(/,/g, "");
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
      <Header category='Data' title='Anggota' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <>
          <div className='w-full flex justify-center'>
            <div className='w-full h-10 flex items-center justify-end'>
              <button
                className='btn btn-outline btn-info btn-sm text-white font-bold capitalize'
                onClick={handleAddClick}
              >
                Tambah Member
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-xs'>
              <thead>
                <tr className='border-b-gray-700 dark:border-b-gray-200 uppercase text-gray-700 dark:text-gray-200'>
                  <th>No. Daftar</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Kota/Kabupaten</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                  <th>Nomor Telepon</th>
                  <th>Kode Pos</th>
                  <th>Kelola</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((member) => (
                  <tr
                    className='border-b-gray-700 dark:border-b-gray-200 text-gray-700 dark:text-gray-200'
                    key={member.id}
                  >
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member?.address}</td>
                    <td>{member?.city}</td>
                    <td>{formatDate(member?.created_at)}</td>
                    <td>
                      {member.deleted_at && formatDate(member.deleted_at)}
                    </td>
                    <td>+{member.phone}</td>
                    <td>{member?.postcode}</td>
                    <td>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          className='btn btn-info btn-square btn-sm'
                          title='Edit'
                          onClick={() => handleEditClick(member)}
                        >
                          <Icon
                            icon='bi:pencil-square'
                            color='#fff'
                            width='20'
                          />
                        </button>
                        <button
                          className={`btn ${
                            member.status === 1 ? "btn-error" : "btn-success"
                          } btn-square btn-sm`}
                          title={` ${
                            member.status === 1 ? "Nonaktifkan" : "Aktifkan"
                          } `}
                          onClick={() =>
                            handleStatusChange(member.id, member.status)
                          }
                        >
                          <Icon
                            icon={`${
                              member.status === 1
                                ? "bi:x-circle-fill"
                                : "bi:check-circle-fill"
                            }`}
                            color='#fff'
                            width='20'
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col items-start justify-center text-gray-700 dark:text-gray-200'>
              <p>Total Anggota: {members?.length}</p>
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
              {selectedData ? "Edit Member" : "Tambah Member"}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Masukkan Nama Lengkap"}
            />
            <TelephoneInput value={phoneNumber} setValue={setPhoneNumber} />
            <Select
              label='Role'
              options={options}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <InputText
              label='Alamat'
              name='address'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={"Masukkan Alamat"}
            />
            <InputText
              label='Kabupaten / Kota'
              name='city'
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={"Masukkan Kabupaten / Kota"}
            />
            <InputText
              label='Kode Pos'
              name='postcode'
              type='text'
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              placeholder={"Masukkan Kode Pos"}
            />
            <InputText
              label='Password'
              name='password'
              showeye
              innerRef={passwordRef}
              placeholder={"Masukkan Password"}
            />
            <InputText
              label='Konfirmasi Password'
              name='passwordConfirm'
              showeye
              innerRef={passwordConfirmationRef}
              placeholder={"Konfirmasi Password"}
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

export default Members;
