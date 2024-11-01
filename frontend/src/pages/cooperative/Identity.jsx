import React, { useEffect, useState } from "react";
import { Alert, Header, InputText, TelephoneInput } from "../../components";
import axiosClient from "../../axios-client";
import { useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/ContextProvider";
import { Icon } from "@iconify/react/dist/iconify.js";

const Identity = () => {
  const queryClient = useQueryClient();
  const { activeMenu, currentColor } = useStateContext();
  const { data: about, isLoading } = useQuery("about", async () => {
    const response = await axiosClient.get("/about");
    return response.data.about;
  });
  const { data: me } = useQuery("me", async () => {
    const response = await axiosClient.get("/me");
    return response.data;
  });
  const [name, setName] = useState("");
  const [legalId, setLegalId] = useState("");
  const [legalDate, setLegalDate] = useState("");
  const [president, setPresident] = useState("");
  const [vicePresident, setVicePresident] = useState("");
  const [secretary, setSecretary] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [supervisor2, setSupervisor2] = useState("");
  const [supervisor3, setSupervisor3] = useState("");
  const [treasurer, setTreasurer] = useState("");
  const [syariah, setSyariah] = useState("");
  const [syariah2, setSyariah2] = useState("");
  const [syariah3, setSyariah3] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [period, setPeriod] = useState("");
  const [year, setYear] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: name,
      legal_entity_id: legalId,
      legal_entity_date: legalDate,
      president: president,
      vice_president: vicePresident,
      secretary: secretary,
      supervisor: supervisor,
      supervisor2: supervisor2,
      supervisor3: supervisor3,
      treasurer: treasurer,
      syariah_supervisor: syariah,
      syariah_supervisor2: syariah2,
      syariah_supervisor3: syariah3,
      address: address,
      city: city,
      province: province,
      phone: phone,
      accounting_period: period,
      accounting_year: year,
      first_accounting_date: firstDate,
      last_accounting_date: lastDate,
    };
    // Update existing member
    axiosClient
      .put(`/about/1`, payload)
      .then(({ data }) => {
        queryClient.invalidateQueries("about");
        setMessage(data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const handleEditClick = (about) => {
    setName(about.name || "");
    setLegalId(about.legal_entity_id || "");
    setLegalDate(about.legal_entity_date || "");
    setPresident(about.president || "");
    setVicePresident(about.vice_president || "");
    setSecretary(about.secretary || "");
    setSupervisor(about.supervisor || "");
    setSupervisor2(about.supervisor2 || "");
    setSupervisor3(about.supervisor3 || "");
    setTreasurer(about.treasurer || "");
    setSyariah(about.syariah_supervisor || "");
    setSyariah2(about.syariah_supervisor2 || "");
    setSyariah3(about.syariah_supervisor3 || "");
    setAddress(about.address || "");
    setCity(about.city || "");
    setProvince(about.province || "");
    setPhone(about.phone || "");
    setPeriod(about.accounting_period || "");
    setYear(about.accounting_year || "");
    setFirstDate(about.first_accounting_date || "");
    setLastDate(about.last_accounting_date || "");
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
      <Header category='Identitas' title='Koperasi' />
      {isLoading ? (
        <div className='flex items-center justify-center h-72'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-col md:flex-row items-center'>
            <img
              src='images/logo.png'
              alt='logo'
              width={90}
              className='w-36 md:w-40'
            />
            <div className='flex flex-col justify-center flex-wrap md:ml-5'>
              <div className='flex md:flex-row flex-col items-center justify-center gap-3 my-5'>
                <h1 className='text-gray-700 dark:text-gray-200 transition duration-300 text-2xl font-bold capitalize text-center md:text-left'>
                  {about.name}
                </h1>
                {me?.role === "admin" && (
                  <button
                    className='btn btn-info btn-square btn-sm'
                    title='Edit'
                    onClick={() => handleEditClick(about)}
                  >
                    <Icon icon='bi:pencil-square' color='#fff' width='20' />
                  </button>
                )}
              </div>
              <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-semibold'>
                {about.legal_entity_id}, {about.legal_entity_date}
              </p>
              {about.address && (
                <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-medium'>
                  {about.address}, {about?.city}, {about?.province}
                </p>
              )}
            </div>
          </div>
          <div className='text-gray-700 dark:text-gray-200 transition duration-300 md:text-lg text-base'>
            <h1 className='text-2xl font-medium capitalize'>
              pengurus koperasi
            </h1>
            <p className='text-gray-700 dark:text-gray-200 transition duration-300 font-medium mt-5'>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Ketua</span>
                <span>: {about.president}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Wakil</span>
                <span>: {about.vice_president}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Sekretaris</span>
                <span>: {about.secretary}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Pengawas</span>
                <span>: {about.supervisor}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Pengawas 1</span>
                <span>: {about.supervisor2}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Pengawas 2</span>
                <span>: {about.supervisor3}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Bendahara</span>
                <span>: {about.treasurer}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Dewan Pengawas Syariah</span>
                <span>: {about.syariah_supervisor}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Dewan Pengawas Syariah 1</span>
                <span>: {about.syariah_supervisor2}</span>
              </span>
              <span className='flex flex-wrap'>
                <span className='md:w-40 w-24'>Dewan Pengawas Syariah 2</span>
                <span>: {about.syariah_supervisor3}</span>
              </span>
            </p>
          </div>
        </div>
      )}
      <dialog id='form' className='modal'>
        <div className='modal-box bg-light-gray dark:bg-secondary-dark-bg'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-700 dark:text-gray-200'>
              Edit Identitas Koperasi
            </h3>
            <form method='dialog'>
              <button className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full'>
                <Icon icon='ic:round-close' color='#99abb4' />
              </button>
            </form>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              label='Nama Koperasi'
              name='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Masukkan Nama Koperasi"}
            />
            <InputText
              label='Nomor Badan Hukum'
              name='legal_entity_id'
              type='number'
              value={legalId}
              onChange={(e) => setLegalId(e.target.value)}
              placeholder={"Masukkan Nomor Badan Hukum"}
            />
            <InputText
              label='Tanggal Badan Hukum'
              name='legal_entity_date'
              type='date'
              value={legalDate}
              onChange={(e) => setLegalDate(e.target.value)}
              placeholder={"Masukkan Tanggal Badan Hukum"}
            />
            <InputText
              label='Ketua'
              name='president'
              type='text'
              value={president}
              onChange={(e) => setPresident(e.target.value)}
              placeholder={"Masukkan Ketua"}
            />
            <InputText
              label='Wakil Ketua'
              name='vice_president'
              type='text'
              value={vicePresident}
              onChange={(e) => setVicePresident(e.target.value)}
              placeholder={"Masukkan Wakil Ketua"}
            />
            <InputText
              label='Sekretaris'
              name='secretary'
              type='text'
              value={secretary}
              onChange={(e) => setSecretary(e.target.value)}
              placeholder={"Masukkan Sekretaris"}
            />
            <InputText
              label='Pengawas'
              name='supervisor'
              type='text'
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              placeholder={"Masukkan Pengawas"}
            />
            <InputText
              label='Pengawas 1'
              name='supervisor2'
              type='text'
              value={supervisor2}
              onChange={(e) => setSupervisor2(e.target.value)}
              placeholder={"Masukkan Pengawas 1"}
            />
            <InputText
              label='Pengawas 2'
              name='supervisor3'
              type='text'
              value={supervisor3}
              onChange={(e) => setSupervisor3(e.target.value)}
              placeholder={"Masukkan Pengawas 2"}
            />
            <InputText
              label='Bendahara'
              name='treasurer'
              type='text'
              value={treasurer}
              onChange={(e) => setTreasurer(e.target.value)}
              placeholder={"Masukkan Bendahara"}
            />
            <InputText
              label='Dewan Pengawas Syariah'
              name='syariah_supervisor'
              type='text'
              value={syariah}
              onChange={(e) => setSyariah(e.target.value)}
              placeholder={"Masukkan Dewan Pengawas Syariah"}
            />
            <InputText
              label='Dewan Pengawas Syariah 1'
              name='syariah_supervisor2'
              type='text'
              value={syariah2}
              onChange={(e) => setSyariah2(e.target.value)}
              placeholder={"Masukkan Dewan Pengawas Syariah 1"}
            />
            <InputText
              label='Dewan Pengawas Syariah 2'
              name='syariah_supervisor3'
              type='text'
              value={syariah3}
              onChange={(e) => setSyariah3(e.target.value)}
              placeholder={"Masukkan Dewan Pengawas Syariah 2"}
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
              label='Provinsi'
              name='province'
              type='text'
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder={"Masukkan Provinsi"}
            />
            <TelephoneInput value={phone} setValue={setPhone} />
            <InputText
              label='Periode Akuntansi'
              name='accounting_period'
              type='text'
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder={"Masukkan Periode Akuntansi"}
            />
            <InputText
              label='Tahun Pembukuan'
              name='accounting_year'
              type='text'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={"Masukkan Tahun Pembukuan"}
            />
            <InputText
              label='Tanggal Awal Pembukuan'
              name='first_accounting_date'
              type='date'
              value={firstDate}
              onChange={(e) => setFirstDate(e.target.value)}
              placeholder={"Masukkan Tanggal Awal Pembukuan"}
            />
            <InputText
              label='Tanggal Akhir Pembukuan'
              name='last_accounting_date'
              type='date'
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
              placeholder={"Masukkan Tanggal Akhir Pembukuan"}
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

export default Identity;
