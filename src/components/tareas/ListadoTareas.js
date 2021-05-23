import React, { useContext } from "react";
import Tareas from "./Tareas";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const tareasContext = useContext(tareaContext);

  const { proyecto, eliminarProyecto } = proyectosContext;
  const { tareasproyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  const [proyectoActual] = proyecto;

  const handleClick = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.lenght === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : <TransitionGroup>
          {
            (
              tareasproyecto.map((tarea) => 
              <CSSTransition 
                key={tarea._id}
                timeout={200}
                classNames="tarea"

              ><Tareas tarea={tarea} /></CSSTransition>)
            )
          }
        </TransitionGroup>
        }
      </ul>

      <button type="button" className="btn btn-eliminar" onClick={handleClick}>
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
