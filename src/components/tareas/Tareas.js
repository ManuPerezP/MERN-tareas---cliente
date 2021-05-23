import React,{useContext} from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tareas = ({tarea}) => {

    console.log(tarea)

    const proyectosContext = useContext(proyectoContext);
    const {proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);

    const {eliminarTarea , obtenerTareas, actualizarTarea,guardarTareaActual} = tareasContext;

    const [proyectoActual] = proyecto;

    const handleDelete = id =>{
        eliminarTarea(id, proyectoActual._id)
        console.log()
        obtenerTareas(proyectoActual._id)
    }

    const handleCmabiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }  
        actualizarTarea(tarea);
    }

    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }

  return (
    <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ? (
                    <button type="button" className="completo" onClick={()=>handleCmabiarEstado(tarea)}>Comnpleto</button>
                    ) : (<button type="button" className="incompleto"  onClick={()=>handleCmabiarEstado(tarea)}>Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={()=>seleccionarTarea(tarea)}>
                    Editar
                </button>

                <button type="button" className="btn btn-secundario" onClick={()=>handleDelete(tarea._id)}>
                    Eliminar
                </button>
            </div>
    </li>
  );
};

export default Tareas;