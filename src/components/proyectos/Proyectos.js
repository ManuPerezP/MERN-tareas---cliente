import React, { useContext, useEffect } from "react";
import SideBar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {

  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } =  authContext;

  useEffect(()=>{
    usuarioAutenticado();
            //eslint-disable-next-line
  },[]);

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
