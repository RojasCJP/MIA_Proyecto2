import React from "react";

export class Revisor extends React.Component {
    state = {
        aplicantes: []
    };

    componentDidMount = () => {
        this.getAllAplyers();
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    {this.state.aplicantes.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.num}>
                                <br />
                                <h4 className='col'>CUI</h4><p className='col'>{element.CUI}</p>
                                <h4 className='col'>Nombre</h4><p className='col'>{element.NOMBRE}</p>
                                <h4 className='col'>Apellido</h4><p className='col'>{element.APELLIDO}</p>
                                <h4 className='col'>Correo</h4><p className='col'>{element.CORREO}</p>
                                <h4 className='col'>Direccion</h4><p className='col'>{element.DIRECCION}</p>
                                <br />
                                <div>
                                    <button type='button' className='btn btn-success'>Aceptar</button>
                                    <button type='button' className='btn btn-danger'>Rechazar</button>
                                </div>
                                <br />
                            </div>
                                <div className='col-1'></div>
                            </>)}
                </div>
            </div>
        );
    }

    getAllAplyers() {
        var ruta = 'http://localhost:4000/consult/allAplyers';
        fetch(ruta, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async response => {
            var i = 1;
            const jsonInicial = await response.json();
            const json = jsonInicial.data;
            if (json != null) {
                json.forEach(element => {
                    element['num'] = i;
                    i++;
                });
                this.setState({ aplicantes: json });
            }
        });
    }
}