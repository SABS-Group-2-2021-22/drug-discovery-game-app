import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";

import { userActions } from '../../actions';

import './login.css'

const [loginForm, setloginForm] = useState({
  email: "",
  password: ""
})

const { token, removeToken, setToken } = useToken();

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        //reset login status when loading login page
        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };
    }

    // handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();         // prevents default action of form, ie submission form occurring

    //     this.setState({ submitted: true });
    //     const { username } = this.state;
    //     if (username) {
    //         this.props.login(username);
    //     }
    // }

    logMeIn = (event) => {
        axios({
            method: "POST",
            url:"/token",
            data:{
                email: loginForm.email,
                password: loginForm.password
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token)
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

    handleChange = (event) => { 
        const { value, name} = event.target
        setloginForm(prevNote => ({
        ...prevNote, [name]: value})
    )}

    render() {
        const { loggingIn, loggedIn } = this.props;
        const { username, submitted } = this.state;

        if (this.props.loggedIn) {
            return <Navigate to='/introduction' />
        }
        return (
            <div className='wrapper'>
                <div className="login-page" >
                    <h3>Enter a username</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has error' : '')}>
                            <label htmlFor='username'></label>
                            <input type='text' className='form-control' name='username' value={username} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <button className='login-button' onClick={logMeIn}>Continue</button>
                            {loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.login;
    return { loggingIn, loggedIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(LoginPage);