import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import history from "../history/history";

export class Guest extends React.Component {
    state = {
        puestos: [],
        puestoName: ''
    };
    componentDidMount = () => {
        this.getAllPuestos();
    };
    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    <div className=" col-11">
                        <input type='text' className="form-control" value={this.state.puestoName} onChange={(e) => { this.setState({ puestoName: e.target.value }); }}></input>
                    </div>
                    <button className='btn btn-success col-1' onClick={() => { this.searchPuestos(); }}>Buscar</button>
                </div>
                <br />
                <Carousel>
                    {this.state.puestos.map(element =>
                        <>
                            <div className='card mt-4 px-2' key={element.num}>
                                <br />
                                <h4 className='col'>Puesto</h4><p className="col">{element.PUESTO}</p>
                                <h4 className='col'>Departamento</h4><p className="col">{element.DEPARTAMENTO}</p>
                                <h4 className='col'>Salario</h4><p className="col">{element.SALARIO}</p>
                                <button type='button' className='btn btn-primary' onClick={() => { history.push('/aplicante'); }}>Aplicar</button>
                                <br />

                                <br />
                            </div>
                        </>)}
                </Carousel>
            </div>
        );
    }

    getAllPuestos() {
        var ruta = 'http://localhost:4000/puestos';
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
                this.setState({ puestos: json });
            }
        });
    }

    searchPuestos() {
        console.log("si esta entrando al metodo");
        var puestoName = this.state.puestoName;
        var ruta = 'http://localhost:4000/searchPuestos';
        var consulta = {
            puesto: puestoName
        };
        if (puestoName != '' && puestoName != null && puestoName != undefined) {

            fetch(ruta, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(consulta)
            }).then(async response => {
                var i = 1;
                const jsonInicial = await response.json();
                const json = jsonInicial.data;
                if (json != null) {
                    json.forEach(element => {
                        element['num'] = i;
                        i++;
                    });
                    this.setState({ puestos: json });
                }
            });
        } else {
            console.log("entra aqui wtf");
            this.getAllPuestos();
        }
    }
};