import React from 'react';

export class Administrador extends React.Component {

    state = {
        masiva: '',
        usuarioCoordinador: '',
        passCoordinador: '',
        depCoordinador: '',
        usuarioRevisor: '',
        passRevisor: '',
        depRevisor: '',
        idUser: '',
        userUser: '',
        passUser: ''
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='card'>
                    <h4>Carga masiva</h4>
                    <div className='col-sm'>
                        <textarea cols='120' rows='15' value={this.state.masiva} onChange={(e) => { this.setState({ masiva: e.target.value }); }}></textarea>
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6'>Load</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6' onClick={() => this.cargaMasiva()}>Send</button>
                    </div>
                </div>
                <br />
                <div className='card'>
                    <h4>Coordinador de departamento</h4>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Departamento:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.depCoordinador} onChange={(e) => { this.setState({ depCoordinador: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.usuarioCoordinador} onChange={(e) => { this.setState({ usuarioCoordinador: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Contrasena:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.passCoordinador} onChange={(e) => { this.setState({ passCoordinador: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6' onClick={() => this.agregarcoordinador()}>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6' onClick={() => this.agregarCoordinador()}>Create</button>
                    </div>
                </div>
                <br />
                <div className='card'>
                    <h4>Reclutador</h4>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Departamento:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.depRevisor} onChange={(e) => { this.setState({ depRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.usuarioRevisor} onChange={(e) => { this.setState({ usuarioRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Contrasena:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.passRevisor} onChange={(e) => { this.setState({ passRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6' onClick={() => this.agregarRevisor()}>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6' onClick={() => this.agregarRevisor()}>Create</button>
                    </div>
                </div>
                <br />
                <div className='card'>
                    <h4>Revisor</h4>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Departamento:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.depRevisor} onChange={(e) => { this.setState({ depRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.usuarioRevisor} onChange={(e) => { this.setState({ usuarioRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Contrasena:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.passRevisor} onChange={(e) => { this.setState({ passRevisor: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6' onClick={() => this.agregarRevisor()}>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6' onClick={() => this.agregarRevisor()}>Create</button>
                    </div>
                </div>
                <br />
                <div className='card'>
                    <h4>Editar usuarios</h4>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Id Usuario:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.idUser} onChange={(e) => { this.setState({ idUser: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.userUser} onChange={(e) => { this.setState({ userUser: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <p>Password:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.passUser} onChange={(e) => { this.setState({ passUser: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                    </div>

                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-12' onClick={() => this.editUsers()}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
    cargaMasiva() {
        var cargaConsult = {
            "xml": this.state.masiva
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cargaConsult)
        };
        fetch('http://localhost:4000/consult/cargaMasiva', requestOptions).then(async response => {
            const json = await response.json();
            if (json.text != 'error') {
                alert('se han ingresado los datos de manera correcta');
            } else {
                alert("el usuario y contrasena no coinciden por favor revisar");
            }
        });
    }

    agregarCoordinador() {
        var coordinadorConsult = {
            "user": this.state.usuarioCoordinador,
            "password": this.state.passCoordinador,
            "dep": this.state.depCoordinador
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coordinadorConsult)
        };
        console.log(coordinadorConsult);
        fetch('http://localhost:4000/consult/coordinadorDepartamento', requestOptions).then(async response => {
            const json = await response.json();
            console.log(json);
        });
    }

    agregarRevisor() {
        var revisorConsult = {
            "user": this.state.usuarioRevisor,
            "password": this.state.passRevisor,
            "dep": this.state.depRevisor
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(revisorConsult)
        };
        console.log(revisorConsult);
        fetch('http://localhost:4000/consult/revisorDepartamento', requestOptions).then(async response => {
            const json = await response.json();
            console.log(json);
        });
    }

    editUsers() {
        var userConsult = {
            "id": this.state.idUser,
            "username": this.state.userUser,
            "password": this.state.passUser
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userConsult)
        };
        fetch('http://localhost:4000/consult/editUser', requestOptions).then(async response => {
            const json = await response.json();
            if (json.status == 200) alert("usuario editado con exito");
            else alert("no se puede editar este usuario");
            console.log(json);
        });
    }
}