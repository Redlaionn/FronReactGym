import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import RutinaForm from './RutinaForm';



function Rutina() {
  return (
    <div>  
       <RutinaForm />
    </div>
  )
}

export default Rutina