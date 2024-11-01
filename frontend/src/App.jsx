import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Activity,
  ActivityDetail,
  BalanceSheet,
  Calculation,
  CapitalChanges,
  CashFlow,
  ChangeProfile,
  Dashboard,
  Equity,
  Estimation,
  FinalReceivable,
  GrandBook,
  Identity,
  Information,
  Journal,
  Login,
  MemberCapital,
  Members,
  Notfound,
  Policy,
  Profile,
  Receivables,
  RemainingBusiness,
  WorkSheet,
  AddActivity
} from "./pages";
import { DefaultLayout, GuestLayout } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/identitas-koperasi' element={<Identity />} />
          <Route path='/informasi-koperasi' element={<Information />} />
          <Route path='/kegiatan-koperasi' element={<Activity />} />
          <Route path='/kegiatan-koperasi/:id' element={<ActivityDetail />} />
          <Route path='/tambah-kegiatan' element={<AddActivity />} />
          <Route path='/data-anggota' element={<Members />} />
          <Route path='/bagan-perkiraan' element={<Estimation />} />
          <Route path='/laporan-awal-ekuitas' element={<Equity />} />
          <Route path='/kebijakan-koperasi' element={<Policy />} />
          <Route path='/piutang-awal' element={<Receivables />} />
          <Route path='/jurnal' element={<Journal />} />
          <Route path='/buku-besar' element={<GrandBook />} />

          <Route path='/laporan-neraca' element={<BalanceSheet />} />
          <Route path='/laporan-phu' element={<Calculation />} />
          <Route path='/laporan-arus-kas' element={<CashFlow />} />
          <Route
            path='/laporan-modal-anggota-akhir'
            element={<MemberCapital />}
          />
          <Route path='/laporan-piutang-akhir' element={<FinalReceivable />} />
          <Route
            path='/laporan-shu-bagian-pemilik'
            element={<RemainingBusiness />}
          />
          <Route path='/laporan-perubahan-modal' element={<CapitalChanges />} />

          <Route path='/neraca-lajur' element={<WorkSheet />} />
          <Route path='/profil' element={<Profile />} />
          <Route path='/edit-profil' element={<ChangeProfile />} />
        </Route>
        <Route path='/' element={<GuestLayout />}>
          <Route path='/account/auth/login' element={<Login />} />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
