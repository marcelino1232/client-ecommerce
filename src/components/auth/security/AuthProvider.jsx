import React, { createContext, useContext, useState } from "react";
import {
  getRole,
  LoginName,
  removeToken,
  setToken,
} from "../../../helpers/GetToken";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../helpers/Role";
import { signOut, login } from "../../../services/userService";
import { updateProfile } from "../../../services/profileService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navegate = useNavigate();

  const [avatar, setAvatar] = useState(LoginName());

  const signIn = async (userData) => {
    const request = await login(userData);

    if (request.success) {
      setToken(request.data.token);

      setAvatar(LoginName());

      var role = getRole();

      if (role == Role.Client) {
        navegate("/");
      } else {
        navegate("/v1");
      }
    }

    return request;
  };

  const profileUpdate = async (profile) => {
    const request = await updateProfile(profile);

    if (request.success) {
      
      setToken(request.data.token);

      var role = getRole();

      setAvatar(LoginName());

      if (role == Role.Client) {
        navegate("/profile");
      } else {
        navegate("/v1/profile");
      }
    }

    return request;
  };

  const logOut = async () => {
    await signOut();
    removeToken();
    navegate("/login");
  };

  return (
    <AuthContext.Provider value={{ signIn, logOut, profileUpdate, avatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
