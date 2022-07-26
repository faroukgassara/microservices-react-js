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


import { AiFillDelete,AiFillEdit,AiOutlineSend } from "react-icons/ai";
import ApplicationsModal from "./applicationsmodal";
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

    const [tableData, setTableData] = useState([]);
    const [IsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/applications')
        .then(response => {setTableData(response.data);})
        .catch(error => {
            console.error(error)
        });
    })

    const [selectedRowAction, setSelectedRowAction] = useState(null);

    const handleActionsClick = selectedRowId => {
        setSelectedRowAction(selectedRowId);
    };

    function deleteUser(row) {
        console.log(row)
        axios.delete('http://localhost:3000/applications/'+row._id)
        .then(response => {console.log("response.data")})
        .catch(error => {
            console.error(error)
        });
    }

    function editUser(row) {
        console.log(row)
        axios.delete('http://localhost:3000/users/'+row._id)
        .then(response => {console.log("response.data")})
        .catch(error => {
            console.error(error)
        });
    }

    function affectRoleToUser(row) {
        console.log(row)

    }

    const deleteBtnStyle = {
        backgroundColor: '#f44336',
        padding:'10px',
        margin:'2px',
    };

    const editBtntyle = {
        backgroundColor: '#4CAF50',
        padding:'10px',
        margin:'2px',
    };

    const sendBtnstyle = {
        backgroundColor: '#008CBA',
        padding:'10px',
        margin:'2px',
    };

    const addappbtn = {
        backgroundColor: '#555555',
        padding:'10px',
        margin:'10px',
    };

    

    const actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="row">
                <button style={sendBtnstyle} onClick={() => affectRoleToUser(row)} type="button" className="btn btn-danger"> <AiOutlineSend /></button>
                
              
                <button style={editBtntyle} onClick={() => editUser(row)} type="button" className="btn btn-danger"> <AiFillEdit /></button>
               
             
                <button style={deleteBtnStyle} onClick={() => deleteUser(row)} type="button" className="btn btn-danger"> <AiFillDelete /></button>
              
            </div>
        );
      };

    const columns = [
        {dataField:'url',text:'url',sort:true,filter: textFilter()},
        {dataField:'name',text:'name',sort:true,filter: textFilter()},
        {dataField:'isDeleted',text:'isDeleted ',sort:true},
        
        {
            dataField: "actions",
            text: "Actions",
            formatter: actionsFormatter
        }

    ]


    const paginator = paginationFactory({
        page : 1, 
        sizePerPage : 5,
        lastPageText :'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange:function(page,sizePerPage){
            console.log(page)
            console.log(sizePerPage)
        }
    })



    return (
        <DashboardWrapper>
            
            <DashboardWrapperMain>
                <div className="row">
                    <ApplicationsModal onClose={() => setIsOpen(false)} open={IsOpen}>Hello</ApplicationsModal>
                </div>

                <div className="row">
                
                    <div className="col-8 col-md-12">
                        <div className="row">
                            {
                                data.summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-4 hide-md">
                        <SummaryBoxSpecial item={data.revenueSummary} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Box>
                        <button style={addappbtn} type="button" onClick={() => {  setIsOpen(true) }} className="btn btn-danger">Add Application <AiOutlineSend /></button>
                            <BootstrapTable
                                pagination={paginator}
                                bootstrap4
                                keyField="_id"
                                columns={columns}
                                data={tableData}
                                filter={ filterFactory() }
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
                <div className="title mb">Revenue by channel</div>
                <div className="mb">
                    <RevenueList />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Applications

const RevenueByMonthsChart = () => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            yAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: colors.orange,
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    }

    const chartData = {
        labels: data.revenueByMonths.labels,
        datasets: [
            {
                label: 'Revenue',
                data: data.revenueByMonths.data
            }
        ]
    }
    return (
        <>
            <div className="title mb">
                Revenue by months
            </div>
            <div>
                <Bar options={chartOptions} data={chartData} height={`300px`} />
            </div>
        </>
    )
}