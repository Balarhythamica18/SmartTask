import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookieWithExpiry, getCookieExpiry, getCookie, deleteCookie, clearCookieExpiry } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      const exp = getCookieExpiry('session');
      if (exp && Date.now() > exp) logout(true);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  function login({ email, remember }){
    return new Promise(res => {
      setTimeout(() => {
        const userObj = { email };
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));

        const ms = remember ? 7*24*3600*1000 : 1*3600*1000;
        setCookieWithExpiry('session', 'active', ms);

        res(userObj);
      }, 700);
    });
  }

  function logout(auto = false){
    setUser(null);
    localStorage.removeItem('user');
    deleteCookie('session');
    clearCookieExpiry('session');
    navigate('/login');
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user && !!getCookie('session')
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
