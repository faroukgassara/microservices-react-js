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
    const state = useSelector((state) => state);

    const deleteBtnStyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '2px',
    };

    useEffect(() => {
        axios.get(API_URL + 'affectation/findByUserEmail/' + row.email, { headers: { "Authorization": `Bearer ${state.user.jwt.jwt}` } })
            .then(response => { setTableData(response.data) })
            .catch(error => {
                console.error(error)
            });
    }, [tableData])

    if (!open) { return null }

    function deleteApp(_idAff) {
        if (window.confirm('Do you want to delete this App to The User?')) {
            axios.delete(API_URL + 'affectation/' + _idAff, { headers: { "Authorization": `Bearer ${state.user.jwt.jwt}` } })
                .then(response => {
                    swal({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 2500
                    })
                })
                .catch(error => {
                    console.error(error)
                });

        }

    };

    return (
        <div className='modal' >
            <div className='modal-content area' >

                <button onClick={() => onClose()} type="button" style={{ backgroundColor: '#f44336', }}> Close </button>
                <form >
                    <h2>the applications assigned to : {row.lastname} {row.firstname}</h2>
                    <h5>{row.email}</h5>

                    <table cellPadding="0" cellSpacing="0">
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
