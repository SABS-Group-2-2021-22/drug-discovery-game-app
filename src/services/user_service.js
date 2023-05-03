import { gameActions } from "../actions";
import { loginRequest, logoutRequest } from "../api";

export const userService = {
    login,
    logout,
};

function login(username){
     return loginRequest(username)
        .then(response => {
            const user = response.data;
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
