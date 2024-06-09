import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import ExerciseForm from './Components/ExerciseForm';
//import ExerciseList from './Components/ExerciseList';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import Navegated from './Components/nav'
import { BrowserRouter, Routes } from 'react-router-dom';


import {
  Route
} from "react-router-dom";
import Clients from './Components/Clients';
import Rutina from './Components/Rutina';
import Ejercicios from './Components/Ejercicios';
import Index from './Components/Home';
import ListarRutinas from './Components/ListarRutinas';


function App() {


  return (
    <BrowserRouter>
    <div className="card text-center">
    <Navegated />
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/Clientes" element={<Clients/>}></Route>
        <Route path ="/Ejercicios" element={<Ejercicios/>}></Route>
        <Route path="/Rutina" element={<Rutina/>}></Route>
        <Route path="/ListarRutinas" element={<ListarRutinas/>}></Route>
      </Routes>
    
    <div className="card-header">
   
    </div>
  
      <div className="card-footer text-body-secondary">
        2 days ago
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
