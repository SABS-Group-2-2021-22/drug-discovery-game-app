import { gameActions } from "../actions";
import { loginRequest, logoutRequest } from "../api";

export const userService = {
    login,
    logout,
};

function login(username){
<<<<<<< HEAD
     return loginRequest(username)
        .then(response => {
            const user = response.data;
=======
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username })
        // body: username,
    };

//    return fetch(`http://127.0.0.1:5000/users/authenticate`, requestOptions)
    return fetch(`https://drug-design-game-backend.onrender.com/users/authenticate`, requestOptions)
//    return fetch(`https://drug-discovery-game-backend.onrender.com/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // stores user details in local storage to maintain login state between page refreshes
>>>>>>> ef4e88999b0feac5df3f5e84fdeddbea8cb75817
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }); 
}

function logout() {
        return logoutRequest()
        .then(user => {
            localStorage.removeItem('user');
            gameActions.resetGame();
            return user;
        });
}
