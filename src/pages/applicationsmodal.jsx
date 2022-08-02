import React, { useEffect, useState } from 'react'
import './modal.scss'
import logo from '../assets/images/signupp.png';
import logoo from '../assets/images/ab.png';
import axios from 'axios';
import swal from 'sweetalert';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../actions/index';
import { API_URL } from '../constants/apiUrl';
const ApplicationsModal = ({ open, children, onClose }) => {

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const passwordRegex = RegExp(
        /^[A-Za-z0-9]*$/
    );

    const navigate = useNavigate();

    const state = useSelector((state) => state);

    const dispatch = useDispatch();

    const { signIn, jwt, logOut } = bindActionCreators(actionsCreators, dispatch)


    const MODAL_STYLES = {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%,+50%)',
        backgroundColor: '#FFF',
        width: '500px',
        maxWidth: '100%',
        height: '400px',
        maxHeight: '100%',
        zIndex: 1000,
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 1000,
        overflow: 'auto',
    }

    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [touchedurl, setTouchedurl] = useState(false);
    const [touchedname, setTouchedname] = useState(false);
    const [disableerrorurl, setDisableerrorurl] = useState(true);
    const [disableerrorname, setDisableerrorname] = useState(true);

    useEffect(() => {

        if (touchedname === true && name === "") {
            setDisableerrorname(false)
        }else{
            setDisableerrorname(true)
        }

        if (touchedurl === true && url === "") {
            setDisableerrorurl(false)
        }else{
            setDisableerrorurl(true)
        }
    })

    const AddApp = event => {
        event.preventDefault()
        setLoading(true)
        const application = JSON.stringify({
            "url": url,
            "name": name,
            "isDeleted":false
        });
        axios.post(API_URL+'applications', application, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {onClose();swal({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2500
          });setLoading(false);onClose();console.log("response.data")})
        .catch(error => {
            setLoading(false)
            swal("Try Again!", "Name or Url Already Exist!", "error");
        });
    }

    if (!open) { return null }


    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <form>
                    <h1>New Application</h1>
                    <div className="social-container"></div>

                    <input type="url" name="url" className="form-control" placeholder="Enter url"
                        value={url}
                        onChange={(e) => { setUrl(e.target.value); setTouchedurl(true); }}
                       
                    />
                    <span className="left-side" hidden={disableerrorurl}>enter a valid url</span>

                    <input type="name" name="name" className="form-control" placeholder="Enter name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setTouchedname(true); }}
                        
                    />
                    <span className="left-side" hidden={disableerrorname}>enter a name</span>

                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <button onClick={AddApp} >Add</button>
                </form>

            </div>
        </div>
    )
}
export default ApplicationsModal
