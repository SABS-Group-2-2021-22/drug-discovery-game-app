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
        console.log('login fired')
        if (username) {
            this.props.login(username);
        }
    }

    
    render() {
        const { username, submitted } = this.state;
        console.log(this.props);
        if (this.props.loggedIn){ // && this.props.user !== undefined){ //&& this.props.user.user_status !=='Exists') {
            return <Navigate to='/home' />
        }
        // else if (this.props.loggingIn &&  this.props.user !== undefined && this.props.user.user_status ==='Exists' ) {
            // this.props.user !== undefined &&
            // return (
                // return <Navigate to='/progressloader' />
            //     // <div className='wrapper'>
            //     //     <div >
            //     //         <h3>Hello
            //     //         </h3>
            //     //     </div>
            //     // </div>
            // );    
        // }

        else {
        return (
            <div className='wrapper'>
                <div className="login-page" >
                    
                    {this.props.user.user_status !== 'Exists' ?
                    <>
                    <h3>Enter a username
                        {/* {'[' + this.props.user.username + ']'} */}
                        {/* {'[' + this.props.user.user_status + ']'} */}
                    </h3>
                    <p>                        Do not enter information that could be used to personally identify you
                    </p>
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
                    </>
                    :
                    <h3>Hello</h3>
                        }
                </div>
            </div>
        );
    }
}
}

function mapStateToProps(state) {
    console.log(state.login)
    return {
        loggingIn: state.login.loggingIn,
        loggedIn: state.login.loggedIn,
        user: state.login.user,
        // username: state.login.user.username,
        // user_status: state.login.user.user_status,
      };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(LoginPage);