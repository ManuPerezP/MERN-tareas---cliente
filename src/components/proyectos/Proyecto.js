import React, {useContext} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //obtenfo state
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext;

  const seleccionarProyecto = id =>{
    console.log('----->'+id)
    proyectoActual(id);//fija el proyecto actual
    obtenerTareas(id);
  }

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={()=>seleccionarProyecto(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
