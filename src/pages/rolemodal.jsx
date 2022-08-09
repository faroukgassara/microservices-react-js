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
import { AiFillDelete, AiFillEdit, AiOutlineSend } from "react-icons/ai";
import { API_URL } from '../constants/apiUrl';
const RoleModal = ({ open, children, onClose, row }) => {

    const state = useSelector((state) => state);


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
        paddingTop: '2%'

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
        axios.get(API_URL+'roles', { headers: {"Authorization" : `Bearer ${state.user.jwt.jwt}`} })
            .then(response => { setRolesTableData(response.data) })
            .catch(error => {
                swal("Try Again!", "Unknown error has occurred!", "error");
            });
    }, [rolestableData])

    const [roleid, setRoleid] = useState("")

    if (!open) { return null }




    const affectRoleToUser = event => {
        event.preventDefault()
        setLoading(true)
        const usertoRole = JSON.stringify({
            "_id": row._id,
            "_idRole": roleid,
        });
        axios.post(API_URL+'applications/AffectRoleToApp', usertoRole, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${state.user.jwt.jwt}`
            }
        })
            .then(response => {
                onClose(); setLoading(false); swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2500
                })
            })
            .catch(error => {
                setLoading(false);
                swal("Try Again!", "Unknown error has occurred!", "error");
            });
    }


    const changeSignin = () => {
        setDisablesignin(true);
        setDisablessignup(false);
    };

    const deleteBtnStyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '2px',
    };

    const changeSignup = () => {
        setDisablessignup(true);
        setDisablesignin(false);
    };

    function deleteRole (_idRole) {
        setLoading(true)
        const usertoRole = JSON.stringify({
            "_id": row._id,
            "_idRole": _idRole
            ,
        });
        axios.post(API_URL+'applications/DeleteRoleFromApp', usertoRole, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${state.user.jwt.jwt}`
            }
        })
            .then(response => {
                onClose(); 
                setLoading(false); 
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2500
                })
            })
            .catch(error => {
                setLoading(false);
                swal("Try Again!", "Unknown error has occurred!", "error");
            });
    };


    return (
        <div className='modal' >
            <div className='modal-content ' >
            <button onClick={() => onClose()} type="button" style={{backgroundColor: '#f44336',}}> Close </button>
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

                        <button onClick={affectRoleToUser}>Confirm</button>
                        <a onClick={changeSignin}>Remove Role From Application?</a>
                    </form>
                </div>

                <div  className='area' hidden={disablessignup}>
                    <form >
                        <h2>the roles assigned to : {row.name}</h2>

                        <table  cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody >
                                {row.roles.map(role =>
                                    <tr>
                                        <td>{role.name}</td>
                                        <td>
                                            <div className="row">

                                                <button style={deleteBtnStyle} onClick={() => deleteRole(role._id)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>



                        <a onClick={changeSignup}>Add Role To Application?</a>
                    </form>
                </div>


            </div>
        </div>

    )
}
export default RoleModal
