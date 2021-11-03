import React from "react";

export class Departamento extends React.Component {
    state = {
        deps: []
    };

    componentDidMount = () => {
        this.getAllDeps();
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    {this.state.deps.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.num}>
                                <br />
                                <h4 className='col'>Nombre</h4><p className='col'>{element.NOMBRE}</p>
                                <h4 className='col'>Capital</h4><p className='col'>{element.CAPITAL}</p>
                                <h4 className='col'>Coordinador</h4><p className='col'>{element.USERNAME}</p>
                                <br />
                                <div>
                                    <button type='button' className='btn btn-success col-8' onClick={() => { }}>Ver Empleados</button>
                                </div>
                                <br />
                            </div>
                                <div className='col-1'></div>
                            </>)}
                </div>
            </div>
        );
    }

    getAllDeps() {
        var ruta = 'http://localhost:4000/allDep';
        fetch(ruta, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async response => {
            var i = 1;
            const jsonInicial = await response.json();
            const json = jsonInicial.data;
            console.log(json);
            if (json != null) {
                json.forEach(element => {
                    element['num'] = i;
                    i++;
                });
                this.setState({ deps: json });
                console.log(this.state.deps);
            }

        });
    }
}