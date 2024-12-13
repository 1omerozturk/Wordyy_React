import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import isAdmin from './IsAdmin';
import { Spin } from '../Spinner/Spin';

function AdminRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null başlangıç değeri
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  useEffect(() => {
    const checkAdmin = async () => {
      const auth = await isAdmin(); // Admin yetkisini kontrol et
      setIsAuth(auth);
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) return <div className='text-center'>
    <Spin color={'primary'}/>
  </div>; // Yükleniyorsa spinner ya da metin

  if (isAuth) {
    return children; // Yetkili kullanıcı içerik görür
  }

  return <Navigate to="/" />; // Yetkisiz kullanıcı yönlendirilir
}

export default AdminRoute;