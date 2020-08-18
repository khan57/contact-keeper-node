import AuthContext from "./authContext";
import authReducer from "./authReducer";
import React, { useReducer } from "react";
import setAuthToken from '../../utils/setAuthToken'
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
} from "../types";
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  

  // register user

  const register = async (FormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", FormData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // load user

    const loadUser=async()=>{
      if(localStorage.token){
        setAuthToken(localStorage.token);
      }
      try {
        const res= await axios.get('/api/auth');
        dispatch({type:USER_LOADED,payload:res.data})
      } catch (err) {
          dispatch({type:AUTH_ERROR})
      }
    } 

// login user

const login = async (FormData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth", FormData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser();
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
  }
};


  // logout
  const logout = ()=>{
    dispatch({type:LOGOUT})
  }

  //   clear errors

  const clearErrors = ()=>dispatch({type:CLEAR_ERRORS})

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
