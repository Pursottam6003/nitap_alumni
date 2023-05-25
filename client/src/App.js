import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LayoutComponent from './layout/LayoutComponent'
import Form from './pages/Form'
import Admin from "./pages/Admin";

import './styles/styles.scss'

function App() {
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
}

export default App;
