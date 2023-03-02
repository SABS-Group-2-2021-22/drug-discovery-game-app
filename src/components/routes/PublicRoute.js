import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const user = localStorage.getItem('user');
  console.log(user);
  console.log(user === undefined);
  if (user === undefined){
    return null;
  }
  else if (user) {
    console.log(user);
    return <Navigate to="/" />
  }
  else {
    console.log(user);
    return children;
  }
}