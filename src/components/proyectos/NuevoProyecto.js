import React, { useState, useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectosContext = useContext(ProyectoContext);

    const { formulario, errorformulario,  mostrarFormulario, agreagarProyecto, mostrarError } = proyectosContext;

  //State para Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: ''
  });

  //Extraer nombre del proyecto
  const { nombre } =  proyecto ;

  const onChange =  e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitForm = e => {
    e.preventDefault();

    console.log(`--->${nombre}<--`);
    // Validar el proyecto
    if(nombre === '') {
        mostrarError();
        return;
    }

    //agregar al state
    agreagarProyecto(proyecto);
    guardarProyecto({ nombre: '' });
  };

  const handleClick = e => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={handleClick}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitForm}>
          <input
            type="text"
            className="input-text"
            placeholder="Nuevo Proyecto"
            name="nombre"
            onChange={onChange}
            value={nombre}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? <p className="mensaje error">El Nombre del proyecto es obligatorio</p>:null}
    </>
  );
};

export default NuevoProyecto;
