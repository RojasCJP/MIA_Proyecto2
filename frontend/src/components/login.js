import React from "react";

export class Login extends React.Component{
    render(){
        return(
            <div className='container'>
            <br/>
            <div className='card'>
            <br/>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm'>
                        <p>Username:</p>
                    </div>
                    <div className='col-sm'>
                        <input type='text'></input>
                    </div>
                    </div><br/><br/><div className='row'>
                    <div className='col-sm'>
                        <p>Password:</p>
                    </div>
                    <div className='col-sm'>
                        <input type='password'></input>
                    </div>
                </div>
                <br/>
            </div>
            </div>
            </div>
        )
    }
}