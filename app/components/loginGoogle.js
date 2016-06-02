import React from 'react';

class LoginGoogle extends React.Component {
    constructor(props) {
        super(props);
        this.domainInput = '';
    }

    onLogin(event) {
        event.preventDefault();
        // this.loginGoogle(this.domainInput.value);
        this.props.login({
            domain: this.domainInput.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.onLogin(e)}>
                    <input ref={node => { this.domainInput = node; }} placeholder="domain" />
                    <br/>
                    <button type="submit">
                        Login Google
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginGoogle;
