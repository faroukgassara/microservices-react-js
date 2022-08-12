import { useEffect, useState } from "react"
import './usersmanagement.scss'
import axios from 'axios';
import React from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
import cellEditFactory from 'react-bootstrap-table2-editor';
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import { API_URL } from '../constants/apiUrl';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'


import { AiFillDelete, AiFillEdit, AiOutlineSend } from "react-icons/ai";
import ApplicationsModal from "./applicationsmodal";
import swal from "sweetalert";
import UpdateAppModal from "./updateappmodal";
import RoleModal from "./rolemodal";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)


const Applications = () => {

    const state = useSelector((state) => state);

    const [tableData, setTableData] = useState([]);
    const [IsOpen, setIsOpen] = useState(false);
    const [IsOpenApp, setIsOpenApp] = useState(false);
    const [rolestableData, setRolesTableData] = useState([])

    useEffect(() => {
        axios.get(API_URL + 'applications', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.user.jwt.jwt}`
            }
        })
            .then(response => { setTableData(response.data); })
            .catch(error => {
                swal("Try Again!", "Error!", "error");
            });
    }, [tableData])


    useEffect(() => {
        axios.get(API_URL + 'roles', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.user.jwt.jwt}`
            }
        })
            .then(response => { setRolesTableData(response.data) })
            .catch(error => {
                swal("Try Again!", "Error!", "error");
            });
    }, [rolestableData])

    const onAfterSaveCell = (value, name, row) => {
        if (value !== name) {
            if (window.confirm('Do you want to accep this change?')) {
                const roles = JSON.stringify({
                    "_id": row._id,
                    "name": row.name,
                });
                axios.put(API_URL + 'roles/' + row._id, roles, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${state.user.jwt.jwt}`
                    }
                })
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
                        swal("Try Again!", "Error!", "error");
                    });
            }
        }
    };


    const deleteRoleBtnstyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '1px',
    };

    function deleteRole(row) {
        if (window.confirm('Do you want to delete this role?')) {
            axios.delete(API_URL + 'roles/' + row._id, {
                headers: {
                    "Authorization": `Bearer ${state.user.jwt.jwt}`
                }
            })
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
                    swal("Try Again!", "Error!", "error");
                });

        }
    }

    const actionsrolesFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div >
                <button style={deleteRoleBtnstyle} onClick={() => deleteRole(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

            </div>
        );
    };

    const cellEdit = cellEditFactory({
        mode: 'dbclick',
        blurToSave: true,
        afterSaveCell: onAfterSaveCell,
    });

    const addRole = () => {

        if (window.confirm('Do you want to add this role?')) {
            const roles = JSON.stringify({
                "name": r,
            });
            axios.post(API_URL + 'roles', roles, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${state.user.jwt.jwt}`
                }
            })
                .then(response => {
                    setR("")
                    swal({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 2500
                    })
                })
                .catch(error => {
                    swal("Try Again!", "Error!", "error");
                });
        }


    };

    const columnsRole = [
        {
            dataField: 'name', text: 'Name', sort: true, filter: textFilter(),
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actionsrolesFormatter
        }
    ]

    const [row, setRow] = useState(null);
    const [r, setR] = useState("");
    const [show, setShow] = useState(true);
    const [IsOpenRole, setIsOpenRole] = useState(false)



    function deleteApp(row) {
        if (window.confirm('Do you want to delete this app?')) {
            axios.delete(API_URL + 'applications/' + row._id, {
                headers: {
                    "Authorization" : `Bearer ${state.user.jwt.jwt}`
                }
            })
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
                });
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

    const sendBtnstyle = {
        backgroundColor: '#008CBA',
        padding: '10px',
        margin: '2px',
    };

    const addappbtn = {
        backgroundColor: '#555555',
        padding: '10px',
        margin: '10px',
    };

    const adduserbtn = {
        backgroundColor: '#555555',
        padding: '10px',
        margin: '10px',
    };

    const actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="row">
                <button style={sendBtnstyle} onClick={() => { setIsOpenRole(true); setRow(row) }} type="button" className="btn btn-danger"> <AiOutlineSend /></button>


                <button style={editBtntyle} onClick={() => { setRow(row); setIsOpenApp(true) }} type="button" className="btn btn-danger"> <AiFillEdit /></button>


                <button style={deleteBtnStyle} onClick={() => deleteApp(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

            </div>
        );
    };

    const columns = [
        { dataField: 'url', text: 'Url', sort: true, filter: textFilter() },
        { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
        { dataField: 'isDeleted', text: 'isDeleted ', sort: true },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actionsFormatter
        }
    ]

    const PaginationBtntyle = {
        backgroundColor: '#4CAF50',
        padding: '6px',
        margin: '5px',
    };

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


    return (
        <DashboardWrapper>

            <DashboardWrapperMain>
                <div className="row">
                    <ApplicationsModal onClose={() => setIsOpen(false)} open={IsOpen}>Hello</ApplicationsModal>
                </div>
                <div className="row">
                    <UpdateAppModal onClose={() => setIsOpenApp(false)} open={IsOpenApp} row={row}>Hello</UpdateAppModal>
                </div>
                <div className="row">
                    <RoleModal onClose={() => setIsOpenRole(false)} open={IsOpenRole} row={row}>Hello</RoleModal>
                </div>


                <div className="row">
                    <div className="col-12">
                        <Box>
                            <button style={addappbtn} type="button" onClick={() => { setIsOpen(true) }} className="btn btn-danger">Add Application <AiOutlineSend /></button>
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
                <div className="title mb">Roles</div>

                <div className="mb areaa">
                    <button style={adduserbtn} type="button" onClick={() => { setShow(!show) }} className="btn btn-danger">New Role +</button>

                    <input type="text" name="r" className="form-control" placeholder="Enter role"
                        value={r}
                        hidden={show}
                        onChange={(e) => { setR(e.target.value) }}
                    />

                    <button hidden={show} style={adduserbtn} type="button" onClick={() => { addRole(); setShow(true) }} className="btn btn-danger">Add Role <AiOutlineSend /></button>

                    <BootstrapTable
                        pagination={paginator}
                        bootstrap4
                        keyField="_id"
                        columns={columnsRole}
                        data={rolestableData}
                        filter={filterFactory()}
                        cellEdit={cellEdit}

                    />
                </div>
                <div className="title mb">Overall</div>
                <div className="mb">
                    <OverallList />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Applications


