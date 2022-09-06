import React, { Component } from 'react'

class navbar extends Component {

    logout = ()=>{
        
        window.sessionStorage.removeItem('user')
        window.location.reload();
    }
    render() {
        return (
            <>
            <nav className='navbar navbar-dark bg-dark shadow sticky-top'>
                <div className='container-fluid'>
                    <h1 className='navbar-brand' >My Notes</h1>
                    
                    <div className='d-flex flex-rows'>
                        <button  type={"button"} className='btn btn-dark nav-item' data-bs-toggle="modal" data-bs-target="#confirmLogout"  >Logout</button>
                        
                    </div>
                </div>
            </nav>

            <div className="modal fade " id="confirmLogout" tabindex="-1" aria-labelledby="confirmLogout" aria-hidden="false">
            <div className="modal-dialog ">
                <div className="modal-content bg-dark">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm Logout</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
        
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>this.logout()}>Logout</button>
                </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

export default navbar
