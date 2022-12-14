import axios from "axios";
import { useState } from 'react';

export const userService = {
    login,
    logout,
    logMeIn,
    logMeOut
};

function login(username){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username })
        // body: username,
    };

    // return fetch(`http://127.0.0.1:5000/users/authenticate`, requestOptions)
    return fetch(`https://drug-discovery-game-backend.onrender.com/users/authenticate`, requestOptions)
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
}

function logMeIn(){
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })
    
    axios({
        method: "POST",
        url:"/token",
        data:{
            email: loginForm.email,
            password: loginForm.password
        }
    })
    .then((response) => {
        localStorage.setItem('token', response.data.access_token);
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })
    setloginForm(({
        email: "",
        password: ""}))

    event.preventDefault()
}

function logMeOut(){
    axios({
        method: "POST",
        url:"/logout",
    })
    .then((response) => {
        localStorage.token
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
})}

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