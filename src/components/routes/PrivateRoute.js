
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }){
  const user = useSelector(state => state.login.user);
  const loggedIn = useSelector(state => state.login.loggedIn);
    if (user === undefined || loggedIn === false ){
        return <Navigate to="/login" />
    }
    else if ( user ){
        return children;
    }
    else {
        return <Navigate to="/login" />
    }
}