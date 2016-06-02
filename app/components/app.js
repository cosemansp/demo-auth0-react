/* global Auth0Lock:true */

import React from 'react';

import { Home } from './home';
import { LoggedIn } from './loggedIn';

// import Footer from './Footer';
// import AddTodo from './AddTodo';
// import VisibleTodoList from './VisibleTodoList';

// const App = () => (
//     <div>
//         Hello world
//     </div>
// );

class App extends React.Component {

    componentWillMount() {
        this.lock = new Auth0Lock('cfi7J6zf7uknMjflLd38QizdvWdGPOF3', 'peco.eu.auth0.com');
        this.setState({ idToken: this.getIdToken() });
    }

    getIdToken() {
        let idToken = localStorage.getItem('userToken');
        const authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token;
                localStorage.setItem('userToken', authHash.id_token);
            }
            if (authHash.error) {
                console.log('Error signing in', authHash);
                return null;
            }
        }
        return idToken;
    }

    render() {
        if (this.state.idToken) {
            return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
        }
        return (<Home lock={this.lock} />);
    }

}

// const App = () => (
//   <div>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// );


export default App;
