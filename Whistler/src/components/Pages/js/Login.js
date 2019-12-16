import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import '../css/Login.css'

class Login extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div className="login"> 
                <div className="login-background">
                </div>
                <div className="login-div">
                    <div className="loginform-div">
                        <h1>Login</h1>
                        <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                        <Link to="/view/home" style={{textDecoration: 'none' , color: 'white', outline: '0'}}>
                            <Button>Sign in</Button>
                        </Link>
                        </Form.Group>
                        </Form>
                    </div>
                    <div classname="login-div-background"></div>

                </div>
            </div>
        )
    }
}


export default Login