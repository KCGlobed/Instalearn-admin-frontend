import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import logo from "../../../assets/images/logo.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state added
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${BASE_URL}/users/login/`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.status === 'success') {
        localStorage.setItem('access_token', response.data.data.token.access);
        localStorage.setItem('refresh_token', response.data.data.token.refresh);
        localStorage.setItem('user_role', response.data.data.user_role);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate('/dashboard');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.response?.data?.message || 'Invalid credentials',
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <div className='login_img'>
                    <img src={logo}  className='login_img_logo'/>
                    </div>
                    {/* <h1>Login</h1> */}
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                       <CButton type="submit" color="primary" style={{width:"100%"}} className="px-4" disabled={isLoading}>
                          {isLoading ? 'Logging in...' : 'Login'}
                        </CButton>
                     <CRow> 
                      <CButton color="link" className="px-0" onClick={() => navigate('/forgot-password')}>
                          Forgot password?
                        </CButton>
                     </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
