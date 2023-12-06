import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UpdateProfile from "./pages/UpdateProfile";
import LayoutComponent from './layout/LayoutComponent'
import Form from './pages/Form'
import Admin from "./pages/Admin";
import SignUpAdmin from "./pages/SignUpAdmin";
import './styles/styles.scss'
import ProtectedComponent from "./components/ProtectedComponent";
import UserProvider from "./contexts/user";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <LayoutComponent>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup-admin" element={<SignUpAdmin />} />
            <Route path="/update-profile" element={<ProtectedComponent children={<UpdateProfile />} />} />
            <Route path="/" element={<ProtectedComponent children={<Form />} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </LayoutComponent>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
