import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import history from "../history/history";

export class Guest extends React.Component {
    state = {
        puestos: []
    };
    componentDidMount = () => {
        this.getAllPuestos();
    };
    render() {
        return (
            <div>
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
};