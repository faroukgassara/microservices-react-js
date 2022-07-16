import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EmailConfirmation = () => {

    const params = useParams()

    useEffect(() => {
        axios.post('http://localhost:3000/users/confirmaccount/'+params.email+'/'+params.token)
        .then(response => console.log(response))
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    return (
        <div className="container" id="container">
            Confirmed
        </div>
    )
}

export default EmailConfirmation
