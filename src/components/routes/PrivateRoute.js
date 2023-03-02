
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }){
    const user = localStorage.getItem('user');
    console.log(user);
    if (user === undefined){
        return null;
    }
    else if ( user ){
        return children;
    }
    else {
        return <Navigate to="/login" />
    }
}