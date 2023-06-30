import React, {Component} from "react";
import '../styles/signup.css'
import logo from '../img/logo.png'

class Login extends Component {
    state = {
        mailError: false,
        passError: false
    }

    signup(event) {
        event.preventDefault()
        const pass1 = document.getElementById("pass1")
        const pass2 = document.getElementById("pass2")

        if (pass1.value === pass2.value) {
            document.getElementById("passError").style.display = "none";
            const email = document.getElementsByTagName('input')[0]
            const pass = document.getElementsByTagName('input')[1]

            const user = {
                email: email.value,
                password: pass.value
            }

            fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
                .then((response) => {
                    if (response.ok) {
                        response.json().then(data => {
                            window.open("/?id=" + data, "_self")
                        })
                    } else {
                        response.json().then(data => {
                            let mail = document.getElementById("mailError")
                            mail.style.display = "block"
                            mail.textContent = data.email

                            let pass = document.getElementById("passError1")
                            pass.style.display = "block"
                            pass.textContent = data.password
                        })
                    }
                }).catch(err => {
                console.log(err)
                alert(err)
            })
        } else document.getElementById("passError").style.display = "block";
    }


    render() {
        return (
            <>
                <div className='sign-up'>
                    <div className='background'>
                    </div>
                    <div className='wrapper'>
                        <form onSubmit={this.signup}>
                            <center>
                                <img src={logo} width="120px" height="120px" alt="logo"/>
                                <h1>SIGN UP</h1>
                            </center>
                            <label>Email</label>
                            <input type='text' placeholder='✉️ Enter your email address'/>
                            <label className="error" id="mailError"></label><br/><br/>
                            <label>Password</label>
                            <input type='password' placeholder="🔒 Enter password" id="pass1"/><br/><br/>
                            <label className="error" id="passError1"></label>
                            <label>Confirm password</label>
                            <input type='password' placeholder="🔒 Confirm password" id="pass2"/>
                            <label className="error" id="passError">Passwords don't match!</label>
                            <div className="buttons">
                                <button type="submit">SIGN UP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;