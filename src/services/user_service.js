

export const userService = {
    login
};

function login(username){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username })
    };

    return fetch(`http://127.0.0.1:5000/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // stores user details in local storage to maintain login state between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
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