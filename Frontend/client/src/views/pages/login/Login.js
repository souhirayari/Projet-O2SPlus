import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import loginImg from '../../../assets/images/image1.jpg'
import { useState } from 'react'

const Login = () => {

  const [formData, setFormData] = useState({
    login: '',
    password: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
console.log (formData)
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem('userId', JSON.stringify(data.user.id));
            localStorage.setItem('token', JSON.stringify(data.token));
            // Rediriger vers la page appropriée

            setTimeout(() => {
                window.location.href = data.redirectPath;
            }, 1000);

        } else {
            toast.error(data.error || "Vérifier login ou password ou mail de vérification");
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des informations d\'identification :', error);
        toast.error("user not found")
    }
};


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup style={{ height: '480px' }}>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column justify-content-center">
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" name="login" value={formData.login} onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4"  type="submit" >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white" style={{ width: '40%' }}>
                <div style={{

                  borderRadius: '10px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
                  backgroundPosition: 'center',
                  height: '100%',
                }}>
                  <img src={loginImg} style={{ maxWidth: '100%', height: 'auto', margin: 'auto', display: 'block', borderRadius: '8px', }} />
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
