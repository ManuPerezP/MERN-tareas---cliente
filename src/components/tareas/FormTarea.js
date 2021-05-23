import React, {useContext, useState, useEffect} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  const { proyecto } = proyectosContext;
  const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

  useEffect(()=>{
      if(tareaseleccionada !== null){
        guardarTarea(tareaseleccionada)
      }else{
        guardarTarea({
          nombre: ''
        });
      }
  },[tareaseleccionada]);

  const [tarea, guardarTarea] =  useState({
    nombre: ''
  });

  const {nombre} = tarea;

  if(!proyecto) return null;

  const [proyectoActual] = proyecto;

  const onSubmit = async e =>{
      e.preventDefault();

      if(nombre.trim() === ''){
        validarTarea();
        return;
      }

      if(tareaseleccionada === null){
        tarea.proyecto = proyectoActual._id;
        await agregarTarea(tarea);
      }else{
        await actualizarTarea(tarea); //existente
        limpiarTarea();
      }
console.log("-->",proyectoActual.id,proyectoActual);


      obtenerTareas(proyectoActual._id);

      guardarTarea({
        nombre: ''
      })
  }

  const handleChange = e =>{
    guardarTarea({
      ...tarea, 
      [e.target.name] : e.target.value
    });
  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input type="text" className="input-text" placeholder="Nombre Tarea..." name="nombre" onChange={handleChange} value ={nombre} />
        </div>
        <div className="contenedor-input">
          <input type="submit" className="btn btn-primario btn-submit btn-block"  value={tareaseleccionada ? 'Editar Tarea':'Guardar Tarea'}/>
        </div>
      </form>
      {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>:null}
    </div>
  );
};

export default FormTarea;
