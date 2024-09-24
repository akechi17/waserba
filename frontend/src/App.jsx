import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  BalanceSheet,
  Calculation,
  CapitalChanges,
  CashFlow,
  Dashboard,
  Equity,
  Estimation,
  FinalReceivable,
  Identity,
  Journal,
  Login,
  MemberCapital,
  Members,
  Notfound,
  Policy,
  Receivables,
  RemainingBusiness,
  WorkSheet,
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
          <Route path='/data-anggota' element={<Members />} />
          <Route path='/bagan-perkiraan' element={<Estimation />} />
          <Route path='/laporan-awal-ekuitas' element={<Equity />} />
          <Route path='/kebijakan-koperasi' element={<Policy />} />
          <Route path='/piutang-awal' element={<Receivables />} />
          <Route path='/jurnal' element={<Journal />} />

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
