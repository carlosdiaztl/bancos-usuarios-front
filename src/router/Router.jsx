import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../App';
import UserList from '../components/UserLIst';
import BankList from '../components/BankList';

const Router = () => {


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/banks" element={<BankList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
