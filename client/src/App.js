import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LayoutComponent from './layout/LayoutComponent'
import Form from './pages/Form'
import Admin from "./pages/Admin";
import SignUpAdmin from "./pages/SignUpAdmin";
import './styles/styles.scss'
import useFetchProfile from "./hooks/useFetchProfile";
import ProtectedComponent from "./components/ProtectedComponent";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const { profile, admin, setAdmin, error, loading, refetch } = useFetchProfile();

  if (error) {
    console.log(error);
  }

  const logout = () => {
    axios.post('/users/logout', { withCredentials: true }).then(res => {
      if (res.status === 200) refetch();
    }).catch(err => {
      throw err;
    })
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ profile, error, loading, logout, admin, setAdmin }}>
        <LayoutComponent>
          <Routes>
            <Route path="/login" element={<Login fetchProfile={refetch} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup-admin" element={<SignUpAdmin />} />
            <Route path="/" element={<ProtectedComponent children={<Form />} />} />
            <Route path="/admin" element={<Admin />
              // <ProtectedComponent children={<Admin />} admin={true} />
            } />
          </Routes>
        </LayoutComponent>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
