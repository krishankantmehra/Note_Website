import React, { Component } from 'react'
import Edit from './edit'

class AddData extends Component {
    

    render() {
        return (
            <div className='container-fluid d-flex flex-row justify-content-between my-4'>
                <h1 className="text-center text-uppercase text-dark">Welcome {this.props.userName}</h1>

                <button type="button" className="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#addDataFormundefined">
                    + Notes
                </button>

                <Edit userName={this.props.userName}/>

            </div>
        )
    }
}

export default AddData
