const loginRequest = (type) => ({
    type: 'LOGIN_AUTH0_REQUEST',
    loginType: type,
    // credentials,
});

const loginSuccess = (profile, token) => ({
    type: 'LOGIN_AUTH0_SUCCESS',
    profile,
    token,
});

const loginFailure = (error) => ({
    type: 'LOGIN_AUTH0_FAILED',
    error,
});

const auth0 = new Auth0({
    domain: 'peco.eu.auth0.com',
    clientID: 'cfi7J6zf7uknMjflLd38QizdvWdGPOF3',
    callbackURL: 'http://localhost:8080',
    callbackOnLocationHash: true,
});

// console.log(auth0);

export const logout = () => {
    localStorage.removeItem('userToken');
    return {
        type: 'LOGOUT',
    };
};

export const loginAuth0 = (type, credentials) => {
    return (dispatch) => {
        dispatch(loginRequest(type));

        // common options
        const loginOptions = {
            // Don't display a popup to set an SSO cookie
            sso: false,
            auto_login: false,
            scope: 'openid email name domain',
            user_metadata: {
                domain: credentials.domain,
            },
        };

        if (type === 'google') {
            // google setup
            Object.assign(loginOptions, {
                connection: 'google-oauth2',
                popup: true,
                popupOptions: {
                    width: 200,
                    height: 400,
                },
            });
        } else {
            // password setup
            Object.assign(loginOptions, {
                auto_login: true,
                connection: 'RestDB',
                email: credentials.email,
                password: credentials.passw,
            });
        }

        auth0.login(loginOptions, (err, profile, idToken, accessToken, state) => {
            console.log('err', err);
            console.log('profile', profile);
            console.log('id_token', idToken);
            console.log('access_token', accessToken);
            console.log('state', state);
            if (err) {
                localStorage.removeItem('userToken');
                dispatch(loginFailure(err));
                return;
            }
            localStorage.setItem('userToken', idToken);
            dispatch(loginSuccess(profile, idToken));
        });
    };
};
