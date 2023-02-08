import * as api from "../api";

export const userService = {
    login,
    logout
};

function login(user){
    const usernameDict = {
        username: JSON.stringify({ user })
    }
    return api.fetchLogin(usernameDict)
        .then(handleResponse)
        .then(user => {
            // stores user details in local storage to maintain login state between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local browser storage
    localStorage.removeItem('user');
    this.props.resetGame();
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            // if(response.status === 401) {
            //     // auto logout if response 401 is returned from api
            //     logout();
            //     location.reload(true);
            // }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}