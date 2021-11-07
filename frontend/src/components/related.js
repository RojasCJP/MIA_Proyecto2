import React from 'react';
import { useParams } from 'react-router';

export class Related extends React.Component {

    state = {
        users: [],
        dep: this.props.match.params.dep
    };
    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    {this.state.users.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.key}>
                                <br />
                                <h4 className='col'>Username</h4><p className='col'>{element.USERNAME}</p>
                                <h4 className='col'>Password</h4><p className='col'>{element.PASSWORD}</p>
                                <h4 className='col'>Activo</h4><p className='col'>{element.ACTIVO}</p>
                                <h4 className='col'>Inicio</h4><p className='col'>{element.INICIO}</p>
                                <h4 className='col'>Final</h4><p className='col'>{element.FINAL}</p>
                                <br />
                                <br />
                            </div>
                                <div className='col-1'></div>
                            </>)}
                </div>

            </div>
        );
    }

    getUsers() {
        var ruta = 'http://localhost:4000/consult/userFromDep';
        var object = { dep: this.state.dep };
        fetch(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        }).then(async response => {
            var i = 1;
            const jsonInicial = await response.json();
            const json = jsonInicial.data;
            if (json != null) {
                json.forEach(element => {
                    element['key'] = i;
                    i++;
                });
                this.setState({ users: json });
            }
            console.log(this.state.users);
        });
    }
}