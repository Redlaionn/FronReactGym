import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Ejercicios from './Ejercicios';
import NuevoEjercicio from './AgregarNuevoEjercicioRutina';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const valorinitial = [
  {
    ejericioID : 1,
    rutinaId : 0,
    cantidadRepeticiones : 12,
    peso : 50,
    numeroSet : 1

  }
]

function RutinaForm() {
    const [idRutina,setIdRutina] = useState(0);
    const [nombreRutina,setNombreRutina] = useState("");
    const [arrayDetalleEjercicios,setArrayDetalleEjercicios] = useState([]);
    const [showAgregarEjercicio, setShowAgregarEjercicio] = useState(false);
    const [showBottonAgregarEjercicio, setShowBottonAgregarEjercicio] = useState(true);
    const [DetalleaEditar, setDetalleaEditar] = useState("");
    const MySwal = withReactContent(Swal);


const AgregarDetalleEjercicio = (detalleEjercicio) =>{ 
  
  const newEjercicios = [...arrayDetalleEjercicios, detalleEjercicio];
    setArrayDetalleEjercicios(newEjercicios);
    console.log(arrayDetalleEjercicios)
    
}


const onEditdetalle = (detalle) =>{
  setDetalleaEditar(detalle)
}

const onDeleteDetalle = (idDetalle) =>{

}

 function AgregarRutinaDetalle (rutina){
  const nuevosItems = arrayDetalleEjercicios.map(item => ({
    ...item,
    rutinaId: rutina  // Agrega el nuevo parámetro aquí
}));
  setArrayDetalleEjercicios(nuevosItems)
  return nuevosItems
   
}


 function  insertarRutina() {
  return axios.post('https://localhost:7165/api/Rutina', {
    nombreRutina: nombreRutina,
    fechaCreacion: new Date()
  }).then(response => {
    return response.data.myObject.idRutina; // Retorna directamente el ID
  }).catch(error => {
    console.error(error);
    return 0; // Retorna 0 en caso de error
  });
 }

async function InsertarDetalleEjercicios(arrayEjercicios)
 {
  const promesas = arrayEjercicios.map(Ejercicios =>{
    axios.post('https://localhost:7165/api/DetalleEjercicio',
      {
        ejericioID: Ejercicios.ejericioID,
        rutinaId: Ejercicios.rutinaId,
        cantidadRepeticiones: Ejercicios.cantidadRepeticiones,
        peso: Ejercicios.peso,
        numeroSet: Ejercicios.NumeroSet
      })
 })
 await Promise.all(promesas);}


async function HandleGrabar (){
  try {
    const rutinaId = await insertarRutina();
    if (rutinaId !==0){      
      await InsertarDetalleEjercicios(AgregarRutinaDetalle(rutinaId));
      MySwal.fire('¡Éxito!', 'La rutina y todos los detalles han sido guardados correctamente.', 'success');
      setArrayDetalleEjercicios([])
      setNombreRutina("")
      setShowAgregarEjercicio(false)
      setShowBottonAgregarEjercicio(true)

    }else 
    {
      Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
    }
   
    
  } catch (error) {
    console.error('Error durante la operación:', error);
    Swal.fire('Error', 'Ha ocurrido un error al procesar tu solicitud', 'error');
  }

}

 const MostrarFormulario = () =>{
  setShowAgregarEjercicio(true);
  setShowBottonAgregarEjercicio(false);
 }


  return (
    <div className='container mt-4'>
    <Form>
    <Form.Group className="mb-2" >
                    <Form.Label>Nombre de La Rutina </Form.Label>
                    <Form.Control value={nombreRutina} onChange={e => setNombreRutina(e.target.value)} type="text" placeholder="Ingrese el Nombre de La Rutina" />
      </Form.Group>
      </Form>
      {showBottonAgregarEjercicio&&<button className='btn btn-primary' onClick={() => MostrarFormulario() }>{'Agregar Ejercicio'}</button>  }
      
      {!showBottonAgregarEjercicio&& <button className='btn btn-success' onClick={ HandleGrabar }>{'Grabar Rutina'}</button>}
      {showAgregarEjercicio && 
      <NuevoEjercicio 
      AgregarDetalleEjercicio={AgregarDetalleEjercicio}
      arrayDetalleEjercicios={arrayDetalleEjercicios}
      DetalleaEditar={DetalleaEditar}
      setArrayDetalleEjercicios={setArrayDetalleEjercicios}
      onEditdetalle={onEditdetalle}
      />}


      <table  className="table table-hover mx-auto w-75 mt-4">
      <thead>
        <tr>
          <th scope="col">ID Ejercicio</th>
          <th scope="col">Reps</th>
          <th scope="col">Peso en KG</th>
          <th scope="col">Numero Set </th>

        </tr>
      </thead>
      <tbody>
        {
        Array.isArray(arrayDetalleEjercicios) ?
        arrayDetalleEjercicios.map((exercise, index) => (

          <tr key={index}>
            <td>{exercise.ejericioID}</td>
            <td>{exercise.cantidadRepeticiones}</td>
            <td>{exercise.peso}</td>
            <td>{exercise.NumeroSet}</td>

            <td><div><button className="btn btn-warning" onClick={() => onEditdetalle(exercise)}>Editar</button>
              <button  className="btn btn-danger" onClick={() => onDeleteDetalle(exercise.NumeroSet,exercise)}>Eliminar</button></div>             
            </td>
          </tr>
        ))
         : <tr><td colSpan="2">No hay ejercicios para mostrar.</td></tr>}
      </tbody>
    </table>
    </div>
    
    
  )
}

export default RutinaForm