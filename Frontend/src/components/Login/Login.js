import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {backendURL} from "../../config.json"

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            message: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("backendURL: ", backendURL)
        axios.post(backendURL+'/login', data)
            .then(response => {
                this.setState({
                    authFlag: true
                });
            })
            .catch(error => {
                this.setState({
                    message: error.response.data
                })
            });

    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Admin Login</h2>
                                <p>Please enter your username and password</p>
                            </div>
                            <form onSubmit={this.submitLogin}>
                                <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                                <div class="form-group">
                                    <input onChange={this.usernameChangeHandler} type="text" class="form-control" required name="username" placeholder="Username" />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" class="form-control" required name="password" placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;