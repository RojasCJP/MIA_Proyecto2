import React from "react";

export class Revisor extends React.Component {
    render() {
        return (
            <div className='container'>
                <br />
                <div className='row'>
                    <div className='card col-3 mt-4 px-2'>
                        <br />
                        <div className='row'>
                            <h5 className='col'>CUI:</h5><p className='col'>buenas</p>
                        </div>
                        <div className='row'>
                            <h5 className='col'>Nombre:</h5><p className='col'>buenas</p>
                        </div>
                        <div className='row'>
                            <h5 className='col'>Apellido:</h5><p className='col'>buenas</p>
                        </div>
                        <div className='row'>
                            <h5 className='col'>Correo:</h5><p className='col'>buenas</p>
                        </div>
                        <div className='row'>
                            <h5 className='col'>Direccion:</h5><p className='col'>buenas</p>
                        </div>
                        <br />
                        <div>
                            <button type='button' className='btn btn-success'>Aceptar</button>
                            <button type='button' className='btn btn-danger'>Rechazar</button>
                        </div>
                    </div>
                    <div className='col-1'></div>
                    <div className='card col-3 mt-4'>
                        <p>carta 2 </p>
                    </div>
                    <div className='col-1'></div>
                    <div className='card col-3 mt-4'>
                        <p>carta 2 </p>
                    </div>
                    <div className='col-1'></div>
                    <div className='card col-3 mt-4'>
                        <p>carta 2 </p>
                    </div>
                    <div className='col-1'></div>
                    <div className='card col-3 mt-4'>
                        <p>carta 2 </p>
                    </div>
                    <div className='col-1'></div>
                    <div className='card col-3 mt-4'>
                        <p>carta 2 </p>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        );
    }
}