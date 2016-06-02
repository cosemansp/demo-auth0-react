import React from 'react';

export class LoginGoogle extends React.Component {
    constructor(props) {
        super(props);
        this.domainInput = '';
    }

    onLoginGoogle(event) {
        event.preventDefault();
        // this.loginGoogle(this.domainInput.value);
    }

    render() {
        return (
            <form onSubmit={e => this.onLogin(e)}>
                <input ref={node => { this.domainInput = node; }} placeholder="domain" />
                <br/>
                <button type="submit">
                    Login Google
                </button>
            </form>
        );
    }
}
