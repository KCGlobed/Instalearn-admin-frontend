// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {
//   const isAuthenticated = localStorage.getItem('access_token'); // Token Check

//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default PrivateRoute;




import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('access_token'); 

  console.log("PrivateRoute Check: Token Found?", isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

