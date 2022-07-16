import { useEffect, useState } from "react"
import DashboardWrapper, { DashboardWrapperRight } from "../components/dashboard-wrapper/DashboardWrapper"
import './usersmanagement.scss'
import axios from 'axios';
const UsersManagement = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(response => {setTableData(response.data);console.log(response.data)})
        .catch(error => {
            console.error(error)
        });
    },[])

    return (
        <DashboardWrapper>
            <DashboardWrapperRight>
                <div className="t">
                    <table>
                    <thead>
                <tr>
                    <th>Email </th>
                    <th>Lastname </th>
                    <th>Firstname </th>
                    <th>Address </th>
                    <th>CIN </th>
                    <th>Phone </th>
                    <th>Enabled </th>
                    <th>Locked </th>

                </tr>
            </thead>
            <tbody>
            {
                tableData.map((data, index)=>{
                    return(
                        <tr key={index}>
                            <td>{data.email}</td>
                            <td>{data.lastname}</td>
                            <td>{data.firstname}</td>
                            <td>{data.address}</td>
                            <td>{data.cin}</td>
                            <td>{data.phone}</td>
                            <td>{data.enabled}</td>
                            <td>{data.locked}</td>
                        </tr>
                    )
                })
            }
            </tbody>
                    </table>
                </div>
                
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default UsersManagement