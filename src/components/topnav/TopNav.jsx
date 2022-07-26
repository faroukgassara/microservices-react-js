import React from 'react'
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { data } from '../../constants'
import { useSelector, useDispatch } from "react-redux";
const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    const state = useSelector((state) => state);


    return (
        <div className='topnav'>
            <UserInfo user={state.user.profile.user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
