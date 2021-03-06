import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {
    state={
        erro:''
    }

   

    fazLogin = (e) => {
        e.preventDefault()
        // const login= this.inputLogin.value
        // const senha= this.inputSenha.value
        // console.log(login, senha)

        const dadosLogin = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(dadosLogin)
        })
            .then((res) => {
              //  console.log(res)
                if (!res.ok) {
                    throw res;
                   
                }
                return res.json()
            })
            .then((resJSON) => {
                localStorage.setItem('TOKEN', resJSON.token)

                localStorage.setItem('LOGIN', dadosLogin.login)

                this.props.history.push('/')
            })
            .catch((error) => {
                error.json().then((res) =>{
                    this.setState({
                        erro: res.message
                    })

                    // console.log(res.message);
                    // const erro = res.message   
                                   
                })
               
            })
           

    }



    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form"
                            action="/"
                            onSubmit={this.fazLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input
                                    className="loginPage__input"
                                    type="text"
                                    id="login"
                                    ref={(inputLogin) => this.inputLogin = inputLogin}
                                    name="login" />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input className="loginPage__input"
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    ref={(inputSenha) => this.inputSenha = inputSenha} />
                            </div>

                            {this.state.erro &&
                            <div className="loginPage__errorBox">
                            {this.state.erro} !
                        </div>
                           }
                            {/* <div className="loginPage__errorBox">
                                {this.state.erro}
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage