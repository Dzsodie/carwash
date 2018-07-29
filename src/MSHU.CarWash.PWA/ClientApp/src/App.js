import React, { Component } from 'react';
import { Route } from 'react-router';
import { AzureAD, LoginType, MsalAuthProviderFactory } from 'react-aad-msal';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

// A theme with custom primary and secondary color.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#b5ffff',
            main: '#80d8ff',
            dark: '#49a7cc',
        },
        secondary: {
            light: '#b5ffff',
            main: '#80d8ff',
            dark: '#49a7cc',
        },
    },
    typography: {
        fontFamily: [
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null
        };
    }

    displayName = App.name
    
    unauthenticatedFunction = loginFunction => {
        if (!this.state.userInfo) loginFunction();
        return (<div />);
    };

    userJustLoggedIn = userInfo => {
        this.setState({ userInfo });
    }

    authenticatedFunction = logout => {
        return (<div><button onClick={() => { logout(); }}>Logout</button></div>);
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AzureAD
                    provider={new MsalAuthProviderFactory({
                        authority: 'https://login.microsoftonline.com/common',
                        clientID: '8797ccc8-ec4c-4483-a8e4-b6427bcc0584',
                        scopes: ['openid', 'email', 'profile', 'offline_access'],
                        type: LoginType.Redirect,
                        persistLoginPastSession: true,
                    })}
                    unauthenticatedFunction={this.unauthenticatedFunction}
                    userInfoCallback={this.userJustLoggedIn}
                    authenticatedFunction={this.authenticatedFunction}
                />
                <Layout>
                    <Route exact path="/" component={Home} navbarName="My reservations" />
                    <Route exact path="/index.html" component={Home} navbarName="My reservations" />
                    <Route path="/counter" component={Counter} navbarName="Counter" />
                    <Route path="/fetchdata" component={FetchData} navbarName="Fetch data" />
                </Layout>
            </MuiThemeProvider>
        );
    }
}
