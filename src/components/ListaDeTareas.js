import React, { useState } from 'react';
import TareaFormulario from './TareaFormulario';
import Tarea from './Tarea';
import '../stylesheet/ListaDeTareas.css';

function ListaDeTareas() {

  const [tareas, setTareas] = useState(localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : []);

  const agregarTarea = tareaNueva => {
    if (tareaNueva.texto.trim()) {
      tareaNueva.texto = tareaNueva.texto.trim();
      const tareasActualizadas = [tareaNueva, ...tareas];
      window.localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
      setTareas(tareasActualizadas);
    }
  };

  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    window.localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
    setTareas(tareasActualizadas);
  };

  const completarTarea = id => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    window.localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
    setTareas(tareasActualizadas);
  };

  return (
    <>
      <TareaFormulario onSubmit={agregarTarea} />
      <div className='tareas-lista-contenedor'>
        {
          tareas.map((tarea) =>
            <Tarea
              key={tarea.id}
              id={tarea.id} 
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea} />
          ) 
        }
      </div>
    </>
  );    


  function newFunction() {
    console.log(tareas);
  }
}

export default ListaDeTareas;