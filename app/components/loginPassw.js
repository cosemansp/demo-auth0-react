import React from 'react';

export class LoginGoogle extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogin(event) {
        event.preventDefault();
        console.log(this.domainInput.value);
        console.log(this.emailInput.value);
        console.log(this.passwordInput.value);
    }

    render() {
        return (
            <form onSubmit={e => this.onLogin(e)}>
                <input ref={node => { this.domainInput = node; }} placeholder="domain" />
                <br />
                <input ref={node => { this.emailInput = node; }} placeholder="email" />
                <br />
                <input ref={node => { this.passwordInput = node; }} placeholder="password" />
                <br />
                <button type="submit">
                    Login user/password
                </button>
            </form>
        );
    }
}
