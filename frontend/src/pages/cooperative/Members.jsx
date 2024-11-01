import React, { createRef, useEffect, useState } from "react";
import {
  Alert,
  Header,
  InputText,
  Select,
  TelephoneInput,
} from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt";

const Members = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor, formatDate } = useStateContext();
  const { data: members, isLoading } = useQuery("members", async () => {
    const response = await axiosClient.get("/members");
    return response.data.members;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [selectedData, setSelectedData] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [created, setCreated] = useState("");
  const [deleted, setDeleted] = useState("");
  const [postCode, setPostCode] = useState("");
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const options = ["admin", "member", "notmember"];

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: name,
      phone: phoneNumber,
      role: role,
      address: address,
      city: city,
      created_at: created,
      deleted_at: deleted,
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
    setCreated(member.created_at || "");
    setDeleted(member.deleted_at || "");
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
    setCreated("");
    setDeleted("");
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
          setErrors(response.data.errors);
        }
      });
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

  DataTable.use(DT);

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
              {me?.role === "admin" && (
                <button
                  className='btn btn-outline btn-info btn-sm text-white font-bold capitalize'
                  onClick={handleAddClick}
                >
                  Tambah Member
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
                  <th>No. Daftar</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Kota/Kabupaten</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                  <th>Nomor Telepon</th>
                  <th>Kode Pos</th>
                  {me?.role === "admin" && <th>Kelola</th>}
                </tr>
              </thead>
              <tbody>
                {members?.map((member) => (
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
                    {me?.role === "admin" && (
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
                              member.status == 1 ? "btn-error" : "btn-success"
                            } btn-square btn-sm`}
                            title={` ${
                              member.status == 1 ? "Nonaktifkan" : "Aktifkan"
                            } `}
                            onClick={() =>
                              handleStatusChange(member.id, member.status)
                            }
                          >
                            <Icon
                              icon={`${
                                member.status == 1
                                  ? "bi:x-circle-fill"
                                  : "bi:check-circle-fill"
                              }`}
                              color='#fff'
                              width='20'
                            />
                          </button>
                        </div>
                      </td>
                    )}
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
            {selectedData && (
              <>
                <InputText
                  label='Tanggal Masuk'
                  name='created_at'
                  type='date'
                  value={created}
                  onChange={(e) => setCreated(e.target.value)}
                  placeholder={"Masukkan Tanggal Masuk"}
                />
                <InputText
                  label='Tanggal Keluar'
                  name='deleted_at'
                  type='date'
                  value={deleted}
                  onChange={(e) => setDeleted(e.target.value)}
                  placeholder={"Masukkan Tanggal Keluar"}
                />
              </>
            )}

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
