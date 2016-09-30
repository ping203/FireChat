import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
const firebase = require("firebase");
import Spinner from 'react-native-loading-spinner-overlay';

import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigator.push('friendsList')
                this.setState({
                    loading: false
                })
            }
        });
    }

    static route = {
        navigationBar: {
            title: 'Login',
            ... Styles.NavBarStyles
        }
    }

    login = () => {
        this.setState({
            errorMessage: null,
            loading: true 
        })
        const {email, password} = this.state;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({
                    errorMessage,
                    loading: false
                })
            });
    }

    renderErrorMessage = () => {
        if(this.state.errorMessage)
            return <Text style={styles.error}>{this.state.errorMessage}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                <TextField placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email }) } />
                <TextField placeholder="Password" secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password }) } />
                <Button primary onPress={this.login}>Login</Button>
                {this.renderErrorMessage()}
                <Separator />
                <Button secondary onPress={() => {
                    this.props.navigator.push('signup');
                } }>Sign Up</Button>
                <Button secondary onPress={() => {
                    this.props.navigator.push('forgetPassword');
                } }>Forget Password</Button>

                <Spinner visible={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10
    },
    error: {
        margin: 8,
        marginBottom: 0,
        color: 'red',
        textAlign: 'center'
    }
})