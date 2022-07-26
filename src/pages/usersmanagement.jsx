import { useEffect, useState } from "react"
import './usersmanagement.scss'
import axios from 'axios';
import React from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'


import BootstrapTable from 'react-bootstrap-table-next';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'

import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
import cellEditFactory from 'react-bootstrap-table2-editor';
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
import AddUserModal from "./addusermodal";
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


const UsersManagement = () => {

    const [tableData, setTableData] = useState([])
    const [rolestableData, setRolesTableData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/roles')
            .then(response => { setRolesTableData(response.data) })
            .catch(error => {
                console.error(error)
            });
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => { setTableData(response.data) })
            .catch(error => {
                console.error(error)
            });
    }, [])

    const [selectedRowAction, setSelectedRowAction] = useState(null);

    const handleActionsClick = selectedRowId => {
        setSelectedRowAction(selectedRowId);
    };

    function deleteUser(row) {
        console.log(row)
        axios.delete('http://localhost:3000/users/' + row._id)
            .then(response => { console.log("response.data") })
            .catch(error => {
                console.error(error)
            });
    }

    function editUser(row) {
        console.log(row)
        axios.delete('http://localhost:3000/users/' + row._id)
            .then(response => { console.log("response.data") })
            .catch(error => {
                console.error(error)
            });
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

    const adduserbtn = {
        backgroundColor: '#555555',
        padding: '10px',
        margin: '10px',
    };

    const editRoleBtntyle = {
        backgroundColor: '#4CAF50',
        padding: '10px',
        margin: '1px',
    };

    const deleteRoleBtnstyle = {
        backgroundColor: '#f44336',
        padding: '10px',
        margin: '1px',
    };

    const [row, setRow] = useState("");
    const actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="row">

                <button style={sendBtnstyle} onClick={() =>{ setIsOpenRole(true);setRow(row)}} type="button" className="btn btn-danger"> <AiOutlineSend /></button>


                <button style={editBtntyle} onClick={() => editUser(row)} type="button" className="btn btn-danger"> <AiFillEdit /></button>

                <button style={deleteBtnStyle} onClick={() => deleteUser(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

            </div>
        );
    };

    function deleteRole(row) {
        console.log(row)
        axios.delete('http://localhost:3000/roles/' + row._id)
            .then(response => { console.log("response.data") })
            .catch(error => {
                console.error(error)
            });
    }

    const actionsrolesFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div >
                <button style={deleteRoleBtnstyle} onClick={() => deleteRole(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>

            </div>
        );
    };

    const columns = [
        { dataField: 'email', text: 'Email', sort: true, filter: textFilter() },
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
            formatter:actionsFormatter

        }

    ]

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

    const onAfterSaveCell = (value, name, row) => {
        if (value !== name) {
            if (window.confirm('Do you want to accep this change?')) {
                const roles = JSON.stringify({
                    "_id": row._id,
                    "name": row.name,
                });
                axios.put('http://localhost:3000/roles/' + row._id, roles, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => { console.log("response.data") })
                    .catch(error => {
                        console.error(error)
                    });
            }
        }
    };

    const cellEdit = cellEditFactory({
        mode: 'dbclick',
        blurToSave: true,
        afterSaveCell: onAfterSaveCell,
    });

    const paginator = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
    })

    const [IsOpen, setIsOpen] = useState(false)
    const [IsOpenRole, setIsOpenRole] = useState(false)

    const [r, setR] = useState("");
    const [show, setShow] = useState(true);

    const addRole = () => {

        if (window.confirm('Do you want to add this role?')) {
            const roles = JSON.stringify({
                "name": r,
            });
            axios.post('http://localhost:3000/roles', roles, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => { console.log("response.data") })
                .catch(error => {
                    console.error(error)
                });
        }


    };

    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <AddUserModal onClose={() => setIsOpen(false)} open={IsOpen}>Hello</AddUserModal>
                </div>
                
                <div className="row">
                    <RoleModal onClose={() => setIsOpenRole(false)} open={IsOpenRole} row={row}>Hello</RoleModal>
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
                <div className="title mb">Roles</div>

                <div className="mb">
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
                <div className="title mb">Revenue by channel</div>
                <div className="mb">
                    <RevenueList />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default UsersManagement

