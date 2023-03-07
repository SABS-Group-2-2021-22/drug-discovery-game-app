import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoute({ children }) {
  const user = useSelector(state => state.login.user);
  if (user === undefined || user.loggedIn === false){
    return children;
  }
  else if (user.loggedIn) {
    return <Navigate to="/build" />
  }
  else {
    return children;
  }
}