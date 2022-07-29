
import {Navigate} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const ProtectedRoutes = ({jwt,children}) => {
    if(!jwt){
        return <Navigate to ='/auth'></Navigate>
    }
    return children;
}


export default ProtectedRoutes;