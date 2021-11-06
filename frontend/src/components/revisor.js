import React from "react";
import UserProfile from "../history/session";

export class Revisor extends React.Component {
    state = {
        aplicantes: [],
        nombre: ''
    };

    componentDidMount = () => {
        this.getAllAplyers();
        console.log(UserProfile.getDepartment());
    };


    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    <div className=" col-11">
                        <input type='text' className="form-control" value={this.state.nombre} onChange={(e) => { this.setState({ nombre: e.target.value }); }}></input>
                    </div>
                    <button className='btn btn-success col-1' onClick={() => { this.getSearchAplyers(); }}>Buscar</button>
                </div>
                <br />
                <div className='row'>
                    {this.state.aplicantes.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.key}>
                                <br />
                                <h4 className='col'>CUI</h4><p className='col'>{element.CUI}</p>
                                <h4 className='col'>Nombre</h4><p className='col'>{element.NOMBRE}</p>
                                <h4 className='col'>Apellido</h4><p className='col'>{element.APELLIDO}</p>
                                <h4 className='col'>Correo</h4><p className='col'>{element.CORREO}</p>
                                <h4 className='col'>Direccion</h4><p className='col'>{element.DIRECCION}</p>
                                <h4 className='col'>CV</h4><button type='button' className='btn btn-primary' onClick={() => this.redirectCV(element.CV)}>Ver CV</button>
                                <br />
                                <div>
                                    <button type='button' className='btn btn-success col-6' onClick={() => this.acceptUser(element.NOMBRE, element.APELLIDO, element.CORREO, element.CUI)}>Aceptar</button>
                                    <button type='button' className='btn btn-danger col-6' onClick={() => this.eliminarUser(element.CUI)}>Rechazar</button>
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
                    element['key'] = i;
                    i++;
                });
                this.setState({ aplicantes: json });
            }
        });
    }


    getSearchAplyers() {
        var nombre = this.state.nombre;
        var ruta = 'http://localhost:4000/consult/searchAplyers';
        var objeto = { name: nombre };
        if (nombre != "" && nombre != undefined && nombre != null) {

            fetch(ruta, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objeto)
            }).then(async response => {
                var i = 1;
                const jsonInicial = await response.json();
                const json = jsonInicial.data;
                if (json != null) {
                    json.forEach(element => {
                        element['key'] = i;
                        i++;
                    });
                    this.setState({ aplicantes: json });
                }
            });
        } else {
            this.getAllAplyers();
        }
    }

    acceptUser(nombre, apellido, correo, cui) {
        var ruta = 'http://localhost:4000/consult/sendMail';
        var aplicanteConsult = {
            "nombre": nombre,
            "apellido": apellido,
            'correo': correo,
            "departament": UserProfile.getDepartment()
        };
        fetch(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aplicanteConsult)
        }).then(async response => {
            const json = await response.json();
            if (json.status == 200) {
                alert("aplicante agregado exitosamente");
                this.eliminarUser(cui);
            } else {
                alert("no se pudo ingresar el aplicante");
            }
        });
    }

    redirectCV(link) {
        const win = window.open(link);
        win.focus();
    }

    eliminarUser(cui) {
        var ruta = 'http://localhost:4000/consult/deleteAplyer';
        var aplicanteConsult = {
            "cui": cui
        };
        fetch(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aplicanteConsult)
        }).then(async response => {
            const json = await response.json();
            this.getAllAplyers();
        });
    }
}