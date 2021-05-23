import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      //obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);

      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorno el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      //TODO: Función para enviar el token por headers
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      console.log(respuesta);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      //obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      console.log("---->" + error.response.data.msg);

      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

//Cierra la sesion de usaurio
  const cerrarSesion = async datos =>{
      dispatch({
          type: CERRAR_SESION
      });
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
