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
const UserAppModal = ({ open, children, onClose, row }) => {

    const [tableData, setTableData] = useState("")

    const deleteBtnStyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '2px',
    };

    useEffect(() => {
        axios.get(API_URL+'affectation/findByUserEmail/'+row.email)
            .then(response => { setTableData(response.data) })
            .catch(error => {
                console.error(error)
            });
    }, [tableData])

    const MODAL_STYLES = {
        position: 'fixed',
        top: '-10%',
        left: '50%',
        transform: 'translate(-50%,+50%)',
        backgroundColor: '#FFF',
        width: '700px',
        maxWidth: '100%',
        height: '500px',
        maxHeight: '100%',
        zIndex: 1000,
        //paddingTop: '2%'

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

    if (!open) { return null }

    function deleteApp (_idAff) {
        if (window.confirm('Do you want to delete this App to The User?')) {
            axios.delete(API_URL+'affectation/'+_idAff)
            .then(response => { swal({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2500
              }) })
            .catch(error => {
                console.error(error)
            });

        }

    };

    return (
        <div style={OVERLAY_STYLES}>
            <div className='area' style={MODAL_STYLES}>
            <form >
                        <h1>the applications assigned to : {row.lastname} {row.firstname}</h1>

                        <table  cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody >
                                {tableData.map(app =>
                                    <tr>
                                        <td>{app.applications.name}</td>
                                        <td>
                                            <div className="row">

                                                <button style={deleteBtnStyle} onClick={() => deleteApp(app._id)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>



                    </form>


            </div>
        </div>

    )
}
export default UserAppModal
