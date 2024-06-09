
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseForm from './ExerciseForm';
import ExerciseList from './ExerciseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

function Ejercicios() {


  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const MySwal = withReactContent(Swal)

  useEffect(() => { 
    fetchExercises();
  }, []);

  const fetchExercises = () => {
    axios.get('https://localhost:7165/api/Ejercicio')
      .then(response => {setExercises(response.data.myObject);})
      .catch(error => console.error('Error:', error));
      
  };

  const handleEdit = (exercise) => {
    console.log(exercise);
    setCurrentExercise(exercise);
  };

  const handleDelete = (id,exercise) => {
     Swal.fire({
    title: `Estas Seguro de elimnar ${exercise.nombreEjecicio} ?`,
    text: "No se podra Recuperar!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {     
      axios.delete(`https://localhost:7165/api/Ejercicio/${id}`, {
      }).then(response => {
          MySwal.fire({
            icon: "success",
            title: `<a>Se ha Eliminado Correctamente </strong></a>`,
            showConfirmButton: false,
            timer: 2500
          })
          fetchExercises();
          clearCurrentExercise();
      }).catch(error => {
          console.error('Error en la petición:', error.response ? error.response.data : error);
          alert("Error en la solicitud. Revisa la consola para más detalles.");
      });
    }
  });

  };

  const clearCurrentExercise = () => {
    setCurrentExercise(null);
  };


  return (
            <div>   <ExerciseForm
                    exerciseToEdit={currentExercise}
                    refreshExercises={fetchExercises}
                    clearEdit={clearCurrentExercise}
                    />

                     <ExerciseList
                     exercises={exercises}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                    />
          </div>
  )
}

export default Ejercicios