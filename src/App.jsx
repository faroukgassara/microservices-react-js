import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import SignIn from './pages/Signin'
import EmailConfirmation from './pages/emailconfirmation'
import ForgotPassword from './pages/forgotpassword'
import ResetPassword from './pages/resetpassword'
import UsersManagement from './pages/usersmanagement'
import ProtectedRoutes from './configs/protectedRoutes'
import { useSelector,useDispatch } from "react-redux";
import PageNotFound from './pages/pagenotfound'
import SignUp from './pages/Signup'
function App() {
    const state = useSelector((state) => state);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgotpassword" element={<ForgotPassword /> } />
               
                <Route path="emailconfirmation/:email/:token" element={<EmailConfirmation />} />
                <Route path="resetpassword/:email/:token" element={<ResetPassword />} />
                
                <Route path="/" element={<ProtectedRoutes jwt={state.user.jwt}> <MainLayout /> </ProtectedRoutes>}>
                    <Route index element={<Dashboard />} />
                    <Route path="usersmanagement" element={<UsersManagement />} />
                    <Route path="products" element={<Blank />} />
                    <Route path="customers" element={<Blank />} />
                    <Route path="settings" element={<Blank />} />
                    <Route path="stats" element={<Blank />} />
                </Route>
                
                <Route path="/*" element={<PageNotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
