import React, { Component } from 'react'

class navbar extends Component {

    logout = ()=>{
        
        window.sessionStorage.removeItem('user')
        window.location.reload();
    }
    render() {
        return (
            <nav className='navbar navbar-dark bg-dark shadow sticky-top'>
                <div className='container-fluid'>
                    <h1 className='navbar-brand' >Your Notes</h1>
                    
                    <div className='d-flex flex-rows'>
                        <h1 className='userInfo nav-item'>{this.props.userName}</h1>
                        <button  className='btn btn-dark nav-item'  onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default navbar
