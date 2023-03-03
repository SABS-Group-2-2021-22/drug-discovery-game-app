
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }){
  const user = useSelector(state => state.login.user);
    if (user === undefined){
        return <Navigate to="/login" />
    }
    else if ( user ){
        return children;
    }
    else {
        return <Navigate to="/login" />
    }
}