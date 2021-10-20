import React from 'react';

export class Administrador extends React.Component {
    render() {
        return (
            <div className='container'>
                <br />
                <div className='card'>
                    <h4>Carga masiva</h4>
                    <div className='col-sm'>
                        <textarea cols='120' rows='15'></textarea>
                    </div>
                    <br />
                    <div>
                        <button type='button' className='btn btn-primary btn-outline-light col-6'>Load</button>
                        <button type='button' className='btn btn-success btn-outline-light col-6'>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}