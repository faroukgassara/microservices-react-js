import React from 'react'
import './user-info.scss'
import logoo from '../../assets/images/av.png';
const UserInfo = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={logoo}  />
            </div>
            <div className="user-info__name">
                <span>{user.lastname} {user.firstname}</span>
            </div>
        </div>
    )
}

export default UserInfo
