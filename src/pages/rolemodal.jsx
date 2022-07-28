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
const RoleModal = ({ open, children, onClose ,row}) => {


    const MODAL_STYLES = {
        position: 'fixed',
        //top: '20%',
        left: '50%',
        transform: 'translate(-50%,+50%)',
        backgroundColor: '#FFF',
        width: '700px',
        maxWidth: '100%',
        height: '400px',
        maxHeight: '100%',
        zIndex: 1000,
        paddingTop:'5%'
        
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

    const [loading, setLoading] = useState(false);
    const [rolestableData, setRolesTableData] = useState([])

    const [disablesignin, setDisablesignin] = useState(false);
    const [disablessignup, setDisablessignup] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/roles')
            .then(response => { setRolesTableData(response.data) })
            .catch(error => {
                console.error(error)
            });
    }, [])

    const [roleid, setRoleid] = useState("")

    if (!open) { return null }


    

    const affectRoleToUser = event => {
        event.preventDefault()
        setLoading(true)
        const usertoRole = JSON.stringify({
            "_id": row._id,
            "_idRole": roleid,
        });
        axios.post('http://localhost:3000/applications/AffectRoleToApp', usertoRole, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { onClose();setLoading(false);swal({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2500
              }) })
            .catch(error => {
                setLoading(false);
                console.log(error)
                
                swal("Try Again!", "Unknown error has occurred!", "error");
            });
    }


    const changeSignin = () => {
        setDisablesignin(true);
        setDisablessignup(false);

    };

    const changeSignup = () => {
        setDisablessignup(true);
        setDisablesignin(false);
    };


    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <div hidden={disablesignin}>
                    
                    <form>
                        <select
                            className="select-box"

                            onChange={(e) => { setRoleid(e.target.value); }}
                        >
                            <option defaultValue>Select </option>
                            {rolestableData.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div hidden={!loading} className="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <button  onClick={affectRoleToUser}>Confirm</button>
                        <a onClick={changeSignin}>Remove Role From User?</a>
                    </form>
                </div>

                <div hidden={disablessignup}>
                    <form>
                    <a onClick={changeSignup}>Add Role To User?</a>
                    </form>
                </div>


            </div>
        </div>

    )
}
export default RoleModal
