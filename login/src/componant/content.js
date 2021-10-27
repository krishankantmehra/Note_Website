import axios from 'axios'
import React, { Component } from 'react'
import Edit from './edit'


class content extends Component {
    constructor(params) {
        super(params)

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await fetch(`/users/?user=${this.props.userName}`)
            .then(res => res.json()
                .then(res => {

                    this.setState({ data: res })

                }))

        if (this.state.data.length === 0)
            document.getElementById("content").innerHTML = `<h1  class="text-center">Your Notes will appear here.</h1>`

    }


    componentDidUpdate() {
        if (this.state.data.length === 0)
            document.getElementById("content").innerHTML = `<h1  class="text-center">Your Notes will appear here.</h1>`

    }

    deleteNote = (index, id) => {
        var temp = this.state.data;

        temp.splice(index, 1)

        this.setState(
            {
                data: temp
            }
        )



        this.deleteNoteDB(id)
    }

    deleteNoteDB = async (index) => {
        await axios.post(`/users/data/del`, {
            id: index
        })
    }

    show = (id) => {
        if (document.getElementById('descriptionC' + id).style.display === "block") {
            document.getElementById('descriptionC' + id).style.display = "none"
            document.getElementById('edit' + id).style.display = "none"
            document.getElementById('del' + id).style.display = "none"
        }
        else {
            document.getElementById('descriptionC' + id).style.display = "Block"
            document.getElementById('edit' + id).style.display = "Block"
            document.getElementById('del' + id).style.display = "Block"
        }

    }

    render() {
        return (
            <div className='container-fluid' id="content">
                {
                    this.state.data.map((data, index) => {
                        return <div className="d-flex flex-column justify-content-between p-3 m-3 window text-light shadow" key={index} >
                            <div className='col-12 text-break' onClick={() => this.show(data.id)} style={{ cursor: "pointer" }} >
                                <div className='d-flex flex-row justify-content-between align-items-center text-justify'>

                                    <h1 className='text-primary' >{data.title}</h1>

                                    <div className='d-flex flex-row'>
                                        <button className={`m-1 btn btn-primary border-none contentDescH`} data-bs-toggle="modal" data-bs-target={"#addDataForm" + data.id} id={"edit" + data.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        <button className={`btn btn-outline-primary contentDescH`} data-bs-toggle="modal" data-bs-target={"#confirmDelete" + data.id} id={"del" + data.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex flex-row align-items-start justify-content-start  contentDescH' >
                                <p className={`contentDescH mt-3`} id={"descriptionC" + data.id}>{data.description}</p>



                                <div className='modal fade' id={"confirmDelete" + data.id}>
                                    <div className="modal-dialog modal-sm" >
                                        <div className="modal-content col-12 bg-dark text-light">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirm</h5>
                                                <button type="button" className="btn  btn-dark" data-bs-dismiss="modal" >X</button>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={() => this.deleteNote(index, data.id)} data-bs-dismiss="modal">Delete Note</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Edit userName={this.props.userName} id={data.id} title={data.title} description={data.description} />
                            </div>

                        </div>
                    })}
            </div>
        )
    }
}

export default content
