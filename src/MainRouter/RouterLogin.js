import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from '../Pages/Home';
import SignIn from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import AuthHome from '../Pages/Auth.Home';

const AppRoutes = () => {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Nếu người dùng đã đăng nhập, chuyển hướng họ đến trang chính
        return <Navigate to="/home" />;
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<AuthHome />} />
    </Routes>
  );
};

export default AppRoutes;
