import React, { Component } from 'react'
import axios from 'axios'
class Signup extends Component {
    

    submitSignupForm = async() => {
        var user = document.getElementById("name")
        var password = document.getElementById("password")
        var confirm = document.getElementById("confirm")
        var errormsg = document.getElementById("errormsg")




        if (user.value === "") {
            errormsg.innerHTML = "<p >**name cannot be empty.</p>"
            user.focus()
            return;
        }
        if (password.value === "") {
            errormsg.innerHTML = "<p >**password cannot be empty.</p>"
            password.focus()
            return;
        }
        if (password.value.length < 8) {
            errormsg.innerHTML = "<p >**Password length must be atleast 8. </p>"
            password.focus()
            return;
        }

        if (password.value === confirm.value) {

           

            axios({
                method: 'post',
                url: '/users/add',

                data: {
                    name: user.value,
                    password: password.value
                }
            }).then(response => {
                window.sessionStorage.setItem('user',user.value)
                 window.location.reload()
            })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data === "username taken") {
                            errormsg.innerHTML = "<p>**username taken</p>"
                        }

                    }
                })



        }
        else {
            errormsg.innerHTML = "<p >**password not matched</p>"
            confirm.focus()
            return;
        }
    }

    show = ()=>{
        
        if(this.props.show === 0){
            document.getElementById('signup').style.display = 'block'
        }
        else{
            document.getElementById('signup').style.display = 'none'
        }
    }
    
    componentDidUpdate(){
        this.show()
    }
    render() {
        
        return (
            <div>
                <div id="signup" className="window shadow-lg" >
                    <h1>Sign Up</h1>
                    <p>Already a member <button className="btn btn-secondary border-none" onClick={() => this.props.change()}> login </button></p>
                    <form >
                        <label htmlFor='Username' >Username : </label>
                        <input type="text" className="form-control" name='username' id="name" placeholder='name' /><br></br>

                        <label htmlFor='password' >Password : </label>
                        <input type="password" className="form-control" name='password' id="password" placeholder='password' /><br></br>

                        <label htmlFor='confirm' >Confirm password : </label>
                        <input type="password" className="form-control" name='confirm' id="confirm" placeholder='Retype Password' /><br></br>


                    </form>
                    <button type='submit' className="btn btn-primary" onClick={() => this.submitSignupForm()}>SIGN UP</button>
                    <p id="errormsg" className='text-danger'></p>
                </div>
            </div>
        )
    }
}

export default Signup
