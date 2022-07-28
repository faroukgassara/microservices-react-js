import React, { useEffect, useState } from 'react'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { images } from '../../constants'
import sidebarNav from '../../configs/sidebarNav'
import { useSelector,useDispatch } from "react-redux";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { actionsCreators} from '../../actions/index';
const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {signIn,jwt,logOut} = bindActionCreators(actionsCreators,dispatch)

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const LogOut = event => {
        event.preventDefault()
        logOut();

    }

    const adduserbtn = {
        width: '200%'
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img style={adduserbtn} src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                <a onClick={LogOut}>
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i  className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt">
                        Logout
                    </div>
                </div>
                </a>
            </div>
        </div>
    )
}

export default Sidebar
