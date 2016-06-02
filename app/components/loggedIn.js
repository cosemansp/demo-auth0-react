import React from 'react';

export class LoggedIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
        };
    }

    componentDidMount() {
        // In this case, the lock and token are retrieved from the parent component
        console.log('idToken:', this.props.idToken);
        this.props.lock.getProfile(this.props.idToken, (err, profile) => {
            if (err) {
                console.log('Error loading the Profile', err);
                return;
            }
            this.setState({ profile });
        });
    }

    logout() {
        console.log('logout');
        localStorage.removeItem('userToken');
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
            <div className="loading">Loading profile</div>
        );
    }
}
