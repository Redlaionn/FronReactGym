import React, { useState, useEffect , useRef  } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

function ExerciseForm({ exerciseToEdit, refreshExercises, clearEdit }) {
    const [idEjercicio,setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenReferencia, setImagen] = useState(null);
    const [urlImagen, setUrl] = useState("");
    const MySwal = withReactContent(Swal);
    const fileInputRef = useRef(null);
    const [fileKey, setFileKey] = useState("");
    const  [nuevaUrl, setnuevaUrl ] = useState(0) ;


  
 
  useEffect(() => {

    if (exerciseToEdit) {   
      setId(exerciseToEdit.id_ejericio);
      setNombre(exerciseToEdit.nombreEjecicio);
      setDescripcion(exerciseToEdit.descripcion);
      setImagen(null);

      const fullPath = exerciseToEdit.imagenReferencial;
      const pathParts = fullPath.split('\\'); // Ajusta esto a '\\' si es necesario
      const lastThreeParts = pathParts.slice(-3);
      const displayPath = lastThreeParts.join('/');
      setUrl(displayPath);
      setnuevaUrl(0)  ;

    } else {
      limpiarFormulario();
    }
  }, [exerciseToEdit]); // Dependencia de useEffect
  

  const limpiarFormulario = () => {
    setId("")
    setNombre("");
    setDescripcion("");
    setImagen(null);
    setUrl("");
    setFileKey("");
    setnuevaUrl("");
    if (fileInputRef) {
      fileInputRef.value = "";
      document.getElementById('formFile').value= null;
  }
  };

  const handleImageChange = (e) => {
    console.log("Event Object:", e); // Log the full event object

    // Ensure the event and its properties are properly accessed
    if (e && e.target && e.target.files) {
        console.log("Files Array:", e.target.files); // Log the files array

        // Check if there are files selected
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log("Selected file:", file); // Log the selected file
            setImagen(file); // Set the state with the selected file
            console.log(imagenReferencia);
            setnuevaUrl(1)
            const reader = new FileReader();
            reader.onload = (event) => {
                // Cuando el archivo se ha leído completamente, `event.target.result` contiene la URL de la imagen
                setUrl(event.target.result);
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
            
        } else {
            console.error("No files selected.");
        }
    } else {
        console.error("Improper file input or event handling issue.");
    }
};


  const handleSubmit = () => {

  if (imagenReferencia !== null){
    const formData = new FormData();
     formData.append('file', imagenReferencia);
    
    axios.post('https://localhost:7165/api/Imagen',
    formData).then((response) => {
      // Supongamos que la respuesta incluye la URL de la imagen
      const urlImagen2 = response.data.url;
      console.log(urlImagen2)
 // Ajusta esto según cómo tu API devuelva la URL

      // Ahora actualiza el ejercicio con la nueva imagen URL
      if (exerciseToEdit) {
        // Usar PUT para actualizar un ejercicio existente
        axios.put(`https://localhost:7165/api/Ejercicio/${exerciseToEdit.id_ejericio}`, {
          nombreEjercicio: nombre,
          descripcion: descripcion,
          imagen: urlImagen2  // Asegúrate de que el campo se llame 'imagenReferencial' si así lo espera la API
        })
        .then((response2) => {
          console.log(response2);
          MySwal.fire({
            icon: 'success',
            title: `<a>Se ha modificado el ejercicio :<strong> ${response2.data.myObject.nombreEjecicio} </strong> correctamente</a>`,
            showConfirmButton: false,
            timer: 2000
          });
          refreshExercises();
          limpiarFormulario();
          console.log(fileInputRef)
          if (fileInputRef) {
            fileInputRef.value = "";
            document.getElementById('formFile').value= null;
        };
        })
        .catch(error => {
          console.error('Error al actualizar el ejercicio:', error.response2);
          Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
        });
      } else {
        // Usar POST para crear un nuevo ejercicio
        axios.post('https://localhost:7165/api/Ejercicio', {
          nombreEjecicio: nombre,
          descripcion: descripcion,
          imagen: urlImagen2
        })
        .then((response3) => {
          MySwal.fire({
            icon: "success",
            title: `<a>Se ha grabado el ejercicio :<strong> ${response3.data.myObject.nombreEjecicio} </strong> correctamente</a>`,
            showConfirmButton: false,
            timer: 2500
          });
          refreshExercises();
          limpiarFormulario();
          console.log(fileInputRef.current)
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
        };
        })
        .catch(error => {
          console.error('Error al crear el ejercicio:', error.response3);
          Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
        });
      }
    })
    .catch(error => {
      console.error('Error al subir la imagen:', error.response);
      Swal.fire('Error', 'Ha ocurrido un error al subir la imagen', 'error');
    });
  }else{

    if (exerciseToEdit) {
      // Usar PUT para actualizar un ejercicio existente   
      
      axios.put(`https://localhost:7165/api/Ejercicio/${exerciseToEdit.id_ejericio}`,
        {
          
          nombreEjercicio: nombre,
          descripcion: descripcion,
          imagen: urlImagen
        }
      )
        .then((response) => {
          MySwal.fire({
            icon: 'success',
            title: `<a>Se ha modificado el ejercicio :<strong> ${response.data.myObject.nombreEjecicio} </strong> correctamente</a>`,
            showConfirmButton: false,
            timer: 2000
          });
          refreshExercises();
          limpiarFormulario();
          console.log(fileInputRef.current)
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
        };
        })
        .catch(error => {
          console.error('Error:', error.response);
          Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
        });
    } else {
      // Usar POST para crear un nuevo ejercicio


      axios.post('https://localhost:7165/api/Ejercicio',
      {
        nombreEjecicio : nombre,
        descripcion : descripcion,

       }
      )
        .then((response) => {
          MySwal.fire({
            icon: "success",
            title: `<a>Se ha grabado  el ejercicio :<strong> ${response.data.myObject.nombreEjecicio} </strong> correctamente</a>`,
            showConfirmButton: false,
            timer: 2500
          });
          refreshExercises();
          limpiarFormulario();
          console.log(fileInputRef.current)
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
        };
        })
        .catch(error => {
        
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un código de estado
                // que no está en el rango de 2xx
                
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error("Error de solicitud:", error.request);
            } else {
                // Algo causó un error en la creación de la solicitud
                console.error('Error', error.message);
            }
            console.error("Configuración de la solicitud:", error.config);
          Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
        });
    }
  };

}
  

  return (
    <div className="container mt-4">
      <div className="mb-3 col">
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
      </div>
      <div className="mb-3 col">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción del Ejercicio</Form.Label>
        <Form.Control  value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" as="textarea" rows={3} />
      </Form.Group>
   
      </div>
      <div className="mb-3 col">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label >Ingrese Imagen del Ejercicio</Form.Label>
        <Form.Control type="file" onChange={handleImageChange}  />
      </Form.Group>
      {/* <input key={fileKey} type="file" onChange={handleImageChange} /> */}
      </div>
      <div className="mb-3 col">
         {/* Mostrar la imagen si la URL está disponible */}
        
         {
              urlImagen && urlImagen.trim() !== "" && (
                <img 
                  src={exerciseToEdit && nuevaUrl == 0 ? `https://localhost:7165/${urlImagen}` : urlImagen} 
                  alt="Imagen del Ejercicio" 
                  style={{ width: '300px', height: '250px' }} 
                />
              )
            }
      </div>
      <div>
        <button className='btn btn-success' onClick={handleSubmit}>{exerciseToEdit ? 'Editar' : 'Agregar'}</button>
        {exerciseToEdit && <button className='btn btn-danger' onClick={clearEdit}>Cancelar</button>}
      </div>
    </div>
  );
}

export default ExerciseForm;
