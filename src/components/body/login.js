import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import './login.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            submitted: false,
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();         // prevents default action of form, ie submission form occurring

        this.setState({ submitted: true });
        const { username } = this.state;
        if (username) {
            this.props.login(username);
        }
    }

    render() {
        const { username, submitted } = this.state;
        if (this.props.loggedIn && this.props.user.user_status !=='Exists') {
            return <Navigate to='/home' />
        }
        if (this.props.loggingIn && this.props.user !== undefined && this.props.user.user_status ==='Exists') {
            return <Navigate to='/progressloader' />
            // return (
            //     <div className='wrapper'>
            //         <div >
            //             <h3>Hello
            //             </h3>
            //         </div>
            //     </div>
            // );    
        }

        else
        return (
            <div className='wrapper'>
                <div className="login-page" >
                    <h3>Enter a username
                    </h3>
                    <text>                        Do not enter information that could be used to personally identify you
                    </text>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has error' : '')}>
                            <label htmlFor='username'></label>
                            <input type='text' className='form-control' name='username' value={username} onChange={this.handleChange} />
                        </div>
                        <div className='form-group'>
                            <button className='login-button'>Continue</button>
                            {this.props.loggingIn &&
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
    return {
        loggingIn: state.login.loggingIn,
        loggedIn: state.login.loggedIn,
        user: state.login.user,
      };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(LoginPage);