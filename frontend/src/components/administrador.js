import React from 'react';

export class Administrador extends React.Component {
    render() {
        return (
            <div className='container'>
                <br />
                <div className='card'>
                    <h4>Carga masiva</h4>
                    <div className='col-sm'>
                        <textarea cols='120' rows='15'></textarea>
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6'>Load</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6'>Send</button>
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
}