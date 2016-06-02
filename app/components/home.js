import React from 'react';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        // more info: https://auth0.com/docs/libraries/auth0js
        this.auth0 = new Auth0({
            domain: 'peco.eu.auth0.com',
            clientID: 'cfi7J6zf7uknMjflLd38QizdvWdGPOF3',
            callbackURL: 'http://localhost:8080',
            callbackOnLocationHash: true,
        });

        this.state = {
            profile: null,
        };

        this.domainInput = '';
    }

    showLock() {
        // We receive lock from the parent component in this case
        // If you instantiate it in this component, just do this.lock.show()
        this.props.lock.show();
    }

    loginGoogle(domain) {
        this.auth0.login({
            connection: 'google-oauth2',
            popup: true,
            auto_login: false,
            popupOptions: {
                width: 450,
                height: 800,
            },
            user_metadata: {
                domain,
            },
            scope: 'openid email name domain',
        }, this.signinCallback.bind(this));
    }

    loginPassword(domain, email, password) {
        this.auth0.login({
            // Don't display a popup to set an SSO cookie
            sso: false,
            auto_login: true,
            connection: 'RestDB',
            email,
            password,
            user_metadata: {
                domain,
            },
            scope: 'openid email name domain',
        }, this.signinCallback.bind(this));
    }

    signinCallback(err, profile, id_token, access_token, state) {
        console.log('err', err);
        console.log('profile', profile);
        console.log('id_token', id_token);
        console.log('access_token', access_token);
        console.log('state', state);

        if (err) {
            alert('something went wrong: ' + err.message);
            return;
        }
        localStorage.setItem('userToken', id_token);
        this.setState({ profile });
    }

    logout() {
        localStorage.removeItem('userToken');
        this.setState({ profile: null });
    }

    onLoginGoogle(event) {
        event.preventDefault();
        console.log(this.domainInput.value);
        this.loginGoogle(this.domainInput.value);
    }

    onLoginPassw(event) {
        event.preventDefault();
        console.log(this.domainPasswInput.value);
        console.log(this.emailInput.value);
        console.log(this.passwordInput.value);
        this.loginPassword(
            this.domainPasswInput.value,
            this.emailInput.value,
            this.passwordInput.value
        );
        this.passwordInput.value = '';
    }

    render() {
        if (this.state.profile) {
            return (
                <div>
                    <h2>Welcome {this.state.profile.nickname}</h2>
                    <pre>Profile {JSON.stringify(this.state.profile, null, "\t")}</pre>
                    <button onClick={() => this.logout()}>Logout</button>
                </div>
            );
        }
        return (
            <div className="login-box">
                <p>
                    <a href="#" onClick={() => this.showLock()}>
                        Sign In - Lock
                    </a>
                </p>
                <form onSubmit={e => this.onLoginPassw(e)}>
                    <input ref={node => { this.domainPasswInput = node; }} placeholder="domain" />
                    <br/>
                    <input ref={node => { this.emailInput = node; }} placeholder="email" />
                    <br/>
                    <input ref={node => { this.passwordInput = node; }} placeholder="password" />
                    <br/>
                    <button type="submit">
                        Login user/password
                    </button>
                </form>
                <br/>
                <br/>
                <form onSubmit={e => this.onLoginGoogle(e)}>
                    <input ref={node => { this.domainInput = node; }} placeholder="domain"/>
                    <br/>
                    <button type="submit">
                        Login Google
                    </button>
                </form>
            </div>
        );
    }

}
