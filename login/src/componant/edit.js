import axios from 'axios';
import React, { Component } from 'react';

class Edit extends Component {


    updateStr = (s) => {
        for (let i = 0; i < s.length; i++) {
            if (s[i] === "\"" || s[i] === "'") {

                s = [s.slice(0, i), "\\", s.slice(i)].join('')
                i++
            }

        }
        return s;
    }

    sumbitData = async () => {

        var title = document.getElementById('title' + this.props.id)
        var description = document.getElementById('description' + this.props.id)
        var errormsg = document.getElementById('errormsg' + this.props.id)


        title.value = this.updateStr(title.value)
        description.value = this.updateStr(description.value)
       
        if (title.value === "") {
            title.focus()
            errormsg.innerText = "*Title cannot be empty."
            return;
        }
        if (description.value === "") {
            description.focus()
            errormsg.innerText = "*Description cannot be empty."
            return;
        }
        if (description.value.length > 10000) {
            description.focus()
            errormsg.innerText = "*Description size is too big."
            return;
        }
        if (title.value.length > 500) {
            title.focus()
            errormsg.innerText = "*Title is too big."
            return;
        }




        if (this.props.id) {
            await axios.post('/users/data/update', {
                id: this.props.id,
                name: this.props.userName,
                title: title.value,
                description: description.value
            }).then(res =>
                window.location.reload()
            )
        }
        else {
            await axios.post('/users/data/add', {

                name: this.props.userName,
                title: title.value,
                description: description.value
            }).then(res =>
                window.location.reload()
            )
        }

    }

    componentDidMount() {
        if (this.props.id) {
            document.getElementById('title' + this.props.id).value = this.props.title
            document.getElementById('description' + this.props.id).value = this.props.description
        }
    }


    render() {
        return (
            <div className="modal fade bd-example-modal-lg" id={"addDataForm" + this.props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
                <div className="modal-dialog modal-lg" >
                    <div className="modal-content col-12 bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Note</h5>
                            <button type="button" className="btn  btn-dark" data-bs-dismiss="modal" >X</button>
                        </div>
                        <div className="modal-body">
                            <form id="dataForm">
                                <div className='container'>
                                    <div className='row mb-3'>
                                        <label htmlFor={'title' + this.props.id} className='col-12 '>Title (MAX 500 characters)</label><br />
                                        <input className="m-1" name='title' type="text" id={'title' + this.props.id} />
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-flex flex-row'>
                                            <label htmlFor={'description' + this.props.id} className='col-12 '>Description (MAX 10,000 characters)
                                                <a href="##" onClick={() => { navigator.clipboard.writeText(document.getElementById('description' + this.props.id).value) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                                    </svg>
                                                </a>
                                            </label>

                                        </div>
                                        <textarea className="m-1" id={'description' + this.props.id} name='description'></textarea>
                                    </div>
                                </div>
                            </form>

                            <p id={"errormsg" + this.props.id} className='text-danger'></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.sumbitData}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit
