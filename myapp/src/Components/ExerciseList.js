import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExerciseList({ exercises, onEdit, onDelete }) {
  return (
    <table  className="table table-hover mx-auto w-75 mt-4">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
        Array.isArray(exercises) ?
        exercises.map((exercise, index) => (
          <tr key={index}>
            <td>{exercise.id_ejericio}</td>
            <td>{exercise.nombreEjecicio}</td>
            <td><div><button className="btn btn-warning" onClick={() => onEdit(exercise)}>Editar</button>
              <button  className="btn btn-danger" onClick={() => onDelete(exercise.id_ejericio,exercise)}>Eliminar</button></div>             
            </td>
          </tr>
        ))
         : <tr><td colSpan="2">No hay ejercicios para mostrar.</td></tr>}
      </tbody>
    </table>
  );
}

export default ExerciseList;
