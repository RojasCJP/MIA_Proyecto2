import React from "react";

export class Aplicante extends React.Component {
    state = {
        cui: 0,
        nombre: '',
        apellido: '',
        correo: '',
        direccion: '',
        cv: ''
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
                                <p>CUI:</p>
                            </div>
                            <div className='col-9'>
                                <input type='number' className="form-control" value={this.state.cui} onChange={(e) => { this.setState({ cui: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Nombre:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.nombre} onChange={(e) => { this.setState({ nombre: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Apellido:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.apellido} onChange={(e) => { this.setState({ apellido: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Correo:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.correo} onChange={(e) => { this.setState({ correo: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>Direccion:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.direccion} onChange={(e) => { this.setState({ direccion: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <div className='row'>
                            <div className='col'>
                                <p>CV:</p>
                            </div>
                            <div className='col-9'>
                                <input type='text' className="form-control" value={this.state.cv} onChange={(e) => { this.setState({ cv: e.target.value }); }}></input>
                            </div>
                        </div><br /><br />
                        <br />
                        <button type="button" className="btn btn-success" onClick={() => this.sendAplicante()}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    sendAplicante() {
        var aplicanteConsult = {
            "cui": this.state.cui,
            "nombre": this.state.nombre,
            "apellido": this.state.apellido,
            'correo': this.state.correo,
            'direccion': this.state.direccion,
            'cv': this.state.cv
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aplicanteConsult)
        };
        fetch('http://localhost:4000/nuevoAplicante', requestOptions).then(async response => {
            const json = await response.json();
            if (json.status == 200) {
                alert("aplicante agregado exitosamente");
            } else {
                alert("no se pudo ingresar el aplicante");
            }
        });
    }
}