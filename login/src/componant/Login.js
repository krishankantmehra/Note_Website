import axios from 'axios'
import React, { Component } from 'react'


class Login extends Component {
   
    submitLoginForm = async() => {
        var user = document.getElementById("loginName")
        var password = document.getElementById("loginPassword")
        var errormsg = document.getElementById("loginerrormsg")

        if(user.value === "" ){
            user.focus()
            errormsg.innerHTML = "**PLEASE FILL DETAILS."
            return;
        }
        if(password.value === ""){
            password.focus()
            errormsg.innerHTML = "**PLEASE FILL DETAILS."
            return;
        }

       await axios.post('/users/find', {
           name: user.value,
           password: password.value
       }).then(res => {
            window.sessionStorage.setItem('user',user.value)
            window.location.reload()

       }).catch(error => {
           console.log(error)
           errormsg.innerHTML = "<p>**User not Found</p>"
       })
    
    }

    show = ()=>{
        if(this.props.show === 1){
            document.getElementById('login').style.display = 'block'
        }
        else{
            document.getElementById('login').style.display = 'none'
        }
    }

    componentDidUpdate(){
       this.show()
    }
    componentDidMount(){
        this.show()
    }

    render() {
        return (
            <div>
                <div id="login" className="window shadow-lg" >
                    <h1>Login</h1>
                    <p>Not a member <button className="btn btn-secondary border-none" onClick={() => this.props.change()}> Sign up </button></p>
                    <form >
                        <label htmlFor='Username' >Username : </label>
                        <input type="text" className="form-control" name='username' id="loginName" placeholder='name' /><br></br>

                        <label htmlFor='password' >Password : </label>
                        <input type="password" className="form-control" name='password' id="loginPassword" placeholder='password' /><br></br>

                    </form>
                    <button type='submit' className="btn btn-primary" onClick={() => this.submitLoginForm()}>LOGIN</button>
                    <p id="loginerrormsg" className='text-danger'></p>
                </div>
            </div>
        )
    }
}

export default Login
