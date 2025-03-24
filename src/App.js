// import React, { Suspense, useEffect, useState } from 'react'
// import { HashRouter, Route, Routes } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { CSpinner, useColorModes } from '@coreui/react'
// import './scss/style.scss'

// // We use those styles to show code examples, you should remove them in your application.
// import './scss/examples.scss'
// import { ModalContext } from './Context'
// import CommonModal from './components/CommonModal'

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const Tableview = React.lazy(() => import('./views/pages/Reports/Reports'))

// const App = () => {
//   const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
//   const storedTheme = useSelector((state) => state.theme)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState("");
//   const [modalSize, setModalSize] = useState("");
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.href.split('?')[1])
//     const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
//     if (theme) {
//       setColorMode(theme)
//     }

//     if (isColorModeSet()) {
//       return
//     }
//     setColorMode(storedTheme)
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

  
//   const handleModalData = (data, size = "xl") => {
//     setModalData(data);
//     setModalSize(size);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <ModalContext.Provider
//     value={{
//       handleModalData,
//       closeModal,
//       setData,
//       data,
//       isModalOpen,
//       modalData,
//     }}
//     >
//     <HashRouter>
//       <Suspense
//         fallback={
//           <div className="pt-3 text-center">
//             <CSpinner color="primary" variant="grow" />
//           </div>
//         }
//       >
//         <Routes>
//           <Route exact path="/login" name="Login Page" element={<Login />} />
//           <Route exact path="/register" name="Register Page" element={<Register />} />
//           <Route exact path="/404" name="Page 404" element={<Page404 />} />
//           <Route exact path="/500" name="Page 500" element={<Page500 />} />
       
//           <Route path="*" name="Home" element={<DefaultLayout />} />
//         </Routes>
//       </Suspense>
//     </HashRouter>
//     <CommonModal
//           handleModalData={handleModalData}
//           isModalOpen={isModalOpen}
//           modalData={modalData}
//           modalSize={modalSize}
//           closeModal={closeModal}
//      />
//     </ModalContext.Provider>
//   )
// }

// export default App






import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import './scss/examples.scss';
import { ModalContext } from './Context';
import CommonModal from './components/CommonModal';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');
  const [modalSize, setModalSize] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);
  }, []);

  const handleModalData = (data, size = 'xl') => {
    setModalData(data);
    setModalSize(size);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        handleModalData,
        closeModal,
        setData,
        data,
        isModalOpen,
        modalData,
      }}
    >
      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Suspense fallback={<div>Loading...</div>}></Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
      <CommonModal
        handleModalData={handleModalData}
        isModalOpen={isModalOpen}
        modalData={modalData}
        modalSize={modalSize}
        closeModal={closeModal}
      />
    </ModalContext.Provider>
  );
};

export default App;
