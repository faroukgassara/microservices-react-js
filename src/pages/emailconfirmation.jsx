import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logoo from '../assets/images/conf.png';
import { API_URL } from '../constants/apiUrl';
import swal from 'sweetalert';
const EmailConfirmation = () => {

    const params = useParams()

    const [conf,setConf] = useState(false)

    useEffect(() => {
        axios.post(API_URL+'users/confirmaccount/'+params.email+'/'+params.token)
        .then(response =>{})
        .catch(error => {
            swal("Try Again!", "Unknown error has occurred!", "error");
            setConf(true)
        });
    }, []);
    
    return (
        <div hidden={conf} className="container cont" >
            <img src={logoo} />
        </div>
    )
}

export default EmailConfirmation
