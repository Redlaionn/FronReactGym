import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Alert } from 'bootstrap';



function AgregarNuevoEjercicioRutina({AgregarDetalleEjercicio,arrayDetalleEjercicios, DetalleaEditar, setArrayDetalleEjercicios,onEditdetalle}) {

    const [ejercicios,setEjercicios] = useState([])
    const [dEjercicios,setDEjercicios] = useState([])
    const [idEjercicio,setIdEjercicio] = useState("")
    const [cantidadRep,setCantidadRep] = useState("")
    const [peso,setPeso] = useState("")
    const [NumeroSet,setNumeroSet] = useState("")




    useEffect(() => {
        cargarCbx();
    },[])

    useEffect(() => {

        if (DetalleaEditar) {   
            setIdEjercicio(DetalleaEditar.ejericioID);
            setCantidadRep(DetalleaEditar.cantidadRepeticiones);
            setPeso(DetalleaEditar.peso);
            setNumeroSet(DetalleaEditar.NumeroSet)
    
        } else {
          Limpiar();
        }
      }, [DetalleaEditar]); 

    const cargarCbx = ()=>{
        axios.get('https://localhost:7165/api/Ejercicio')
        .then(response => {
            setEjercicios(response.data.myObject);
            setIdEjercicio(response.data.myObject[0].id_ejericio)
        })
        .catch(error => console.error('Error:', error));
    }

    const handleSelect = (e) =>{
        const selectedId = e.target.value;
        const ejercicio = ejercicios.find(ex => ex.id_ejericio === parseInt(selectedId));
        setIdEjercicio(ejercicio.id_ejericio);

    }

    

    
    const handleSubmitAgregar = ()=>{
        
        const detalleEjercicio = {
            ejericioID: idEjercicio,
            cantidadRepeticiones: cantidadRep,
            peso: peso,
            NumeroSet: DetalleaEditar ? DetalleaEditar.NumeroSet : arrayDetalleEjercicios.length + 1
        };


        if (DetalleaEditar) {
            
            const updatedDetails = arrayDetalleEjercicios.map(detalle =>
                detalle.NumeroSet === DetalleaEditar.NumeroSet ? detalleEjercicio : detalle
            );
            setArrayDetalleEjercicios(updatedDetails); // Asumiendo que tienes acceso para actualizar esto desde aquí
        } else {
            // Modo de adición: añade un nuevo detalle
            AgregarDetalleEjercicio(detalleEjercicio);
        }
        Limpiar();
        
    }

    const Limpiar = ()=>{
        setPeso("");
        setCantidadRep("");
        onEditdetalle("");
    }





  return (
    <Form>
                <Form.Select aria-label="Selecciona un ejercicio" onChange={handleSelect}>
                    <option>Selecciona un ejercicio</option>
                                {ejercicios.map((ejercicio) => (
                    <option key={ejercicio.id_ejericio} value={ejercicio.id_ejericio}>
                        {ejercicio.nombreEjecicio}
                    </option>
                ))}       
                </Form.Select>
                <div>
                <Form.Group className="mb-2" >
                    <Form.Label>Cantidad de Repeticiones </Form.Label>
                        <Form.Control value={cantidadRep} onChange={e => setCantidadRep(e.target.value)} type="number" placeholder="Ingrese Cantidad de Repeticiones" />                        
             
                    <Form.Label>Peso en Kg </Form.Label>
                        <Form.Control value={peso} onChange={e => setPeso(e.target.value)} type="number" placeholder="Ingrese Peso en Kg" />                        
              </Form.Group>
              <Button  onClick={handleSubmitAgregar} variant="primary">Agregar</Button>{' '}
              <Button  onClick={()=>Limpiar()} variant="danger">Cancelar</Button>{' '} 
              </div>
             
            
      </Form>
      );
    }
    
  

export default AgregarNuevoEjercicioRutina