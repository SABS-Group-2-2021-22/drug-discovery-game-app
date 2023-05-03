import { gameActions } from "../actions";
import { loginRequest, logoutRequest , loadGameState} from "../api";

export const userService = {
    login,
    logout,
    loadgamestate
};

function loadgamestate(username){
  return loadGameState(username)
    .then(response => {
        console.log(response.data)
        // console.log(response.json())
        return response.data
    })
//   .catch(error => console.error(error));
}

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
