import React from 'react';

export class Administrador extends React.Component {

    state = {
        masiva: '',
        usuarioCoordinador: '',
        passCoordinador: '',
        depCoordinador: ''
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
                        <button type='button' className='btn btn-primary btn-outline-light col-4'>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-4' onClick={() => this.agregarCoordinador()}>Create</button>
                        <button type='button' className='btn btn-danger btn-outline-light col-4'>Delete</button>
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
                                <input type='text' className="form-control"></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" ></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Contrasena:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" ></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-4'>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-4'>Create</button>
                        <button type='button' className='btn btn-danger btn-outline-light col-4'>Delete</button>
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
                                <input type='text' className="form-control"></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Username:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" ></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Contrasena:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" ></input>
                            </div>
                        </div><br /><br />
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-4'>Edit</button>
                        <button type='button' className='btn btn-success btn-outline-light col-4'>Create</button>
                        <button type='button' className='btn btn-danger btn-outline-light col-4'>Delete</button>
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

    // TODO tengo que anadir el coordinador segun el departamento
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
}