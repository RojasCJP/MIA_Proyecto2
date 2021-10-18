import React from "react";
import history from "../history/history";

export class Login extends React.Component {

    state = {
        username: '',
        password: '',
        entrada: false,
        tipoUsuario: 0,
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='card'>
                    <br />
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col-sm'>
                                <p>Password:</p>
                            </div>
                            <div className='col-9'>
                                <input type='password' className="form-control" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></input>
                            </div>
                        </div>
                        <br />
                        <button type="button" className="btn btn-success" onClick={() => this.consultUser()}>
                            Ingresar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    consultUser() {
        var userConsult = {
            "username": this.state.username,
            "password": this.state.password
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userConsult)
        };
        fetch('http://localhost:4000/user', requestOptions).then(async response => {
            const json = await response.json();
            this.setState({ entrada: json.entrada });
            this.setState({ tipoUsuario: json.tipo });
            console.log(this.state);
            this.redirect();
        });
    }

    redirect() {
        const entrada = this.state.entrada;
        const tipo = this.state.tipoUsuario;
        if (entrada) {
            switch (tipo) {
                case 1:
                    history.push('/administrador');
                    break;
                case 2:
                    history.push('/aplicante');
                    break;
                case 3:
                    history.push('/coordinador');
                    break;
                case 4:
                    history.push('/guest');
                    break;
                case 5:
                    history.push('/revisor');
                    break;
                default:
                    alert("el usuario y contrasena no coinciden por favor revisar valor");
                    break;
            }
        } else {
            alert("el usuario y contrasena no coinciden por favor revisar");
        }
    }
}