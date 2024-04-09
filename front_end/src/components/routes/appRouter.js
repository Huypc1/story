import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from "../views/home";
import SinglePage from '../views/singlePage';
import Create from '../views/create';
import Tap from '../views/tap';
import Read from '../views/read';
import LoginForm from '../views/formLogin';
import CreateAuthor from '../views/createAuthor';

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả định trạng thái đăng nhập
    const role = localStorage.getItem('role');
    // const storedUsername = localStorage.getItem('username');
    if (!isLoggedIn && role && window.location.pathname === "/login") {
        return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role && window.location.pathname === "/create") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role=== "true" && window.location.pathname === "/create") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role=== "true" && window.location.pathname === "/createAuthor") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role=== "true" && window.location.pathname === "/tap") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role=== "true" && window.location.pathname === "/singlepage") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role && window.location.pathname === "/tap") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role && window.location.pathname === "/createAuthor") {
      return <Navigate to="/" />;
    }
    if (!isLoggedIn && !role && window.location.pathname === "/singlepage") {
      return <Navigate to="/" />;
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/singlepage" element={<SinglePage />}></Route>
                <Route path="/singlepage/:id" element={<SinglePage />}></Route>
                {(isLoggedIn || role === "true") && (
                    <>
                        <Route path="/create" element={<Create />}></Route>
                        <Route path="/createAuthor" element={<CreateAuthor />}></Route>
                        <Route path="/tap" element={<Tap />}></Route>
                    </>
                )}
                <Route path="/read/:id" element={<Read />}></Route>
                {(!isLoggedIn && !role) && <Route path="/login" element={<LoginForm />}></Route>}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
