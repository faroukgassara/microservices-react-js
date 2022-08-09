import React from 'react'
import { useEffect, useState } from "react"
import './overall-list.scss'
import { data } from '../../constants'
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from '../../constants/apiUrl';
import axios from 'axios';






const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]






const OverallList = () => {

    const state = useSelector((state) => state);
    const [tableData, setTableData] = useState([])
    const [tableDataa, setTableDataa] = useState([])

    useEffect(() => {
        axios.get(API_URL + 'users', { headers: { "Authorization": `Bearer ${state.user.jwt.jwt}` } })
            .then(response => { setTableData(response.data) })
    }, [tableData])

    
    useEffect(() => {
        axios.get(API_URL + 'applications', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${state.user.jwt.jwt}`
            }
        })
            .then(response => { setTableDataa(response.data); })
    }, [tableDataa])

    return (
        <ul className='overall-list'>
            <li className="overall-list__item" >
                <div className="overall-list__item__icon">
                    <i className='bx bx-user'></i>
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {tableData.length}
                    </div>
                    <span>Users</span>
                </div>
            </li>

            <li className="overall-list__item" >
                <div className="overall-list__item__icon">
                <i className='bx bx-cube'></i>
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {tableDataa.length}
                    </div>
                    <span>Applications</span>
                </div>
            </li>
        </ul>
    )
}

export default OverallList
