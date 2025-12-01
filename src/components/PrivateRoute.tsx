import { Navigate, Outlet } from 'react-router-dom';

const isAuthed = () => !!localStorage.getItem('token');

export default function PrivateRoute() {
  return isAuthed() ? <Outlet /> : <Navigate to="/login" replace />;
}