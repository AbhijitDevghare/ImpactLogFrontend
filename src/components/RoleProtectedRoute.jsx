import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader/Loader';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { isLoggedIn, authLoading, role } = useSelector((state) => state.auth);

  if (authLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

  return children;
};

export default RoleProtectedRoute;