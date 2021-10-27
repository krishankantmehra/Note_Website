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


        console.log("perv:" + description.value)
        title.value = this.updateStr(title.value)
        description.value = this.updateStr(description.value)
        console.log("then:" + description.value)
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
                                        <label htmlFor={'title' + this.props.id} className='col-12 '>Title</label><br />
                                        <input className="m-1" name='title' type="text" id={'title' + this.props.id} />
                                    </div>
                                    <div className='row mt-3'>
                                        <label htmlFor={'description' + this.props.id} className='col-12 '>Description (MAX 10,000 characters)</label><br />
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
