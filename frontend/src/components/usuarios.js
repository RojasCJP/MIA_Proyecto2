import React from "react";

export class Usuarios extends React.Component {
    state = {
        users: []
    };

    componentDidMount = () => {
        this.getAllUsers();
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    {this.state.users.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.num}>
                                <br />
                                <h4 className='col'>Username</h4><p className='col'>{element.USERNAME}</p>
                                <h4 className='col'>Password</h4><p className='col'>{element.PASSWORD}</p>
                                <h4 className='col'>Tipo Usuario</h4><p className='col'>{element.ID_TIPOUSUARIO}</p>
                                <br />
                                <div>
                                    <button type='button' className='btn btn-danger col-6'>Delete user</button>
                                </div>
                                <br />
                            </div>
                                <div className='col-1'></div>
                            </>)}
                </div>
            </div>
        );
    }

    getAllUsers() {
        var ruta = 'http://localhost:4000/allUsers';
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
                this.setState({ users: json });
            }

        });
    }

}