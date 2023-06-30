import React, {Component} from "react";
import '../styles/login.css'
import logo from '../img/logo.png'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.mailError = false;
        this.passError = false;


        this.login = this.login.bind(true)
    }


    login(event) {
        event.preventDefault()

        const email = document.getElementsByTagName('input')[0]
        const pass = document.getElementsByTagName('input')[1]

        const user = {
            email: email.value,
            password: pass.value
        }

        fetch('http://localhost:8080/login', {
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

                        let pass = document.getElementById("passError")
                        pass.style.display = "block"
                        pass.textContent = data.password
                    })
                }
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })

    }


    //создать функцию, которая будет обрабатывать json ответ
    //в ней менять значения mailError и passError, исходя из ответа  json
    //пример ниже:
    // getData() {
    //     this.mailError = json.getMailError();
    //     this.passError = json.getPassError();
    // }

    render() {

        return (
            <>
                <div className='login'>
                    <div className='background'>
                    </div>
                    <div className='wrapper'>
                        <form onSubmit={this.login}>
                            <center>
                                <img src={logo} width="120px" height="120px" alt="logo"/>
                                <h1>LOG IN</h1>
                            </center>
                            <label>Email</label>
                            <input type='text' placeholder='✉️ Enter your email address'/><br/><br/>
                            <label className="error" id={"mailError"}></label>
                            <label>Password</label>
                            <input type='password' placeholder="🔒 Enter your password"/>
                            <label className="error" id={"passError"}></label>
                            <div className="buttons">
                                <button className="form-submit" type="submit">LOG IN</button>
                                <a href="/signup" className="sign-up-link">
                                    <button type="button">SIGN UP</button>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}