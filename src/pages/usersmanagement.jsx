import { useEffect, useState } from "react"
import './usersmanagement.scss'
import axios from 'axios';
import React from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { API_URL } from '../constants/apiUrl';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import { AiFillDelete, AiFillEdit, AiOutlineSend } from "react-icons/ai";
import AddUserModal from "./addusermodal";
import UpdateAppModal from "./updateappmodal";
import UpdateUserModal from "./updateusermodal";
import UserAppModal from "./userappModal";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';
import OverallList from "../components/overall-list/OverallList";
import RevenueList from "../components/revenue-list/RevenueList";

//import 'bootstrap/dist/css/bootstrap.min.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)



const UsersManagement = () => {

    const state = useSelector((state) => state);

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get(API_URL + 'users', { headers: { "Authorization": `Bearer ${state.user.jwt.jwt}` } })
            .then(response => { setTableData(response.data) })
            .catch(error => {
                swal("Try Again!", "Unknown error has occurred!", "error");
            });
    }, [tableData])

    function deleteUser(row) {
        if (window.confirm('Do you want to delete this user?')) {
            axios.delete(API_URL + 'users/' + row._id, { headers: { "Authorization": `Bearer ${state.user.jwt.jwt}` } })
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
                    swal("Try Again!", "Unknown error has occurred!", "error");
                }
                );
        }

    }

    const deleteBtnStyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '2px',
    };

    const editBtntyle = {
        backgroundColor: '#4CAF50',
        padding: '10px',
        margin: '2px',
    };

    const PaginationBtntyle = {
        backgroundColor: '#4CAF50',
        padding: '6px',
        margin: '5px',
    };

    const sendBtnstyle = {
        backgroundColor: '#008CBA',
        padding: '10px',
        margin: '2px',
    };

    const adduserbtn = {
        backgroundColor: '#555555',
        padding: '10px',
        margin: '10px',
    };


    const [row, setRow] = useState("");
    const [rowid, setRowId] = useState("");
    const actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="row">

                <button style={sendBtnstyle} onClick={() => { setIsOpenApp(true); setRow(row);setRowId(row._id) }} type="button" className="btn btn-danger"> <AiOutlineSend /></button>


                <button style={editBtntyle} onClick={() => { setIsOpenUpdate(true); setRow(row) }} type="button" className="btn btn-danger"> <AiFillEdit /></button>

                <button style={deleteBtnStyle} onClick={() => deleteUser(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

            </div>
        );
    };


    const columns = [
        { dataField: 'lastname', text: 'Lastname', sort: true, filter: textFilter() },
        { dataField: 'firstname', text: 'Firstname', sort: true, filter: textFilter() },
        { dataField: 'address', text: 'Address', sort: true, filter: textFilter() },
        { dataField: 'cin', text: 'CIN', sort: true, filter: textFilter() },
        { dataField: 'phone', text: 'Phone', sort: true, filter: textFilter() },
        { dataField: 'enabled', text: 'Enabled ', sort: true },
        { dataField: 'locked', text: 'Locked ', sort: true },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actionsFormatter

        }

    ]

    const sizePerPageRenderer = ({
        options,
        currSizePerPage,
        onSizePerPageChange
    }) => (
        <div role="group">
            {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                        <button
                            key={option.text}
                            type="button"
                            onClick={() => onSizePerPageChange(option.page)}
                            style={PaginationBtntyle}
                        >
                            {option.text}
                        </button>
                    );
                })
            }
        </div>
    );


    const paginator = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',

        sizePerPageRenderer
    })

    const [IsOpen, setIsOpen] = useState(false)
    const [IsOpenApp, setIsOpenApp] = useState(false)
    const [IsOpenUpdate, setIsOpenUpdate] = useState(false)

    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <AddUserModal onClose={() => setIsOpen(false)} open={IsOpen}>Hello</AddUserModal>
                </div>

                <div className="row">
                    <UpdateUserModal onClose={() => setIsOpenUpdate(false)} open={IsOpenUpdate} row={row}>Hello</UpdateUserModal>
                </div>

                <div className="row">
                    <UserAppModal onClose={() => setIsOpenApp(false)} open={IsOpenApp} row={row} rowid={rowid}>Hello</UserAppModal>
                </div>

                <div className="row">
                    <div className="col-12">

                        <Box>
                            <button style={adduserbtn} type="button" onClick={() => { setIsOpen(true) }} className="btn btn-danger">Add User <AiOutlineSend /></button>
                            <BootstrapTable
                                pagination={paginator}
                                bootstrap4
                                keyField="_id"
                                columns={columns}
                                data={tableData}
                                filter={filterFactory()}
                            />
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="title mb">Overall</div>
                <div className="mb">
                    <OverallList />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default UsersManagement

