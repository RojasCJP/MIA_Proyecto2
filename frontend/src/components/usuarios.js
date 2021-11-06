import React from "react";

export class Usuarios extends React.Component {
    state = {
        users: [],
        username: ''
    };

    componentDidMount = () => {
        this.getAllUsers();
    };

    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    <div className=" col-11">
                        <input type='text' className="form-control" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }); }}></input>
                    </div>
                    <button className='btn btn-success col-1' onClick={() => { this.searchUsers(); }}>Buscar</button>
                </div>
                <br />
                <div className='row'>
                    {this.state.users.map(
                        element =>
                            <><div className='card col-3 mt-4 px-2' key={element.num}>
                                <br />
                                <h4 className='col'>Username</h4><p className='col'>{element.USERNAME}</p>
                                <h4 className='col'>Password</h4><p className='col'>{element.PASSWORD}</p>
                                <h4 className='col'>Tipo Usuario</h4><p className='col'>{element.ID_TIPOUSUARIO}</p>
                                <h4 className='col'>Activo</h4><p className='col'>{element.ACTIVO}</p>
                                <h4 className='col'>Inicio</h4><p className='col'>{element.INICIO}</p>
                                <h4 className='col'>Final</h4><p className='col'>{element.FINAL}</p>
                                <br />
                                <div>
                                    <button type='button' className='btn btn-danger col-6' onClick={() => { this.deleteUser(element.USERNAME); }}>Delete user</button>
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

    searchUsers() {
        var nombre = this.state.username;
        var ruta = 'http://localhost:4000/consult/searchUser';
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
                        element['num'] = i;
                        i++;
                    });
                    this.setState({ users: json });
                }
            });
        } else {
            this.getAllUsers();
        }
    }

    deleteUser(username) {
        var ruta = 'http://localhost:4000/consult/deleteUser';
        var userConsult = {
            "username": username
        };
        fetch(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userConsult)
        }).then(async response => {
            const json = await response.json();
            this.getAllUsers();
        });
    }

}