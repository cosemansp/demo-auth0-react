import React from 'react';
import { connect } from 'react-redux';

import LoginGoogle from './loginGoogle';
import LoginPassw from './loginPassw';
import { loginAuth0, logout } from '../actions';

class Home extends React.Component {

    onLogin(type, event) {
        this.props.login(type, event);
    }

    render() {
        if (this.props.auth.profile) {
            return (
                <div>
                    <h2>Welcome {this.props.auth.profile.name}</h2>
                    <pre>Profile:
                     {JSON.stringify(this.props.auth.profile, null, '\t')}
                    </pre>
                    <hr />
                    <button onClick={() => this.props.logout()}>Logout</button>
                </div>
            );
        }

        return (

            <div>
                <div className={this.props.auth.pending ? '' : 'hidden'}>
                    Logging in...
                    <hr />
                </div>
                <div className={this.props.auth.error ? 'alert' : 'hidden'}>
                    !! {(this.props.auth.error) ? this.props.auth.error.message : ''} !!
                </div>
                You can login with any google account, <br /> but the domain must be 'myDomain'
                <LoginGoogle login={(event) => this.onLogin('google', event)} />
                <hr />
                Use any domain and email, but its only valid with password=12345
                <LoginPassw login={(event) => this.onLogin('passw', event)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (type, credentials) => dispatch(loginAuth0(type, credentials)),
        logout: () => dispatch(logout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

