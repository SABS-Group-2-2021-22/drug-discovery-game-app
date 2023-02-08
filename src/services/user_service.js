
export const userService = {
    login,
    logout
};

function login(username){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username })
        // body: username,
    };

    return fetch(`http://127.0.0.1:5000/users/authenticate`, requestOptions)
//    return fetch(`https://drug-design-game-backend.onrender.com/users/authenticate`, requestOptions)
//    return fetch(`https://drug-discovery-game-backend.onrender.com/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // stores user details in local storage to maintain login state between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // localStorage.setItem('user', user);

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