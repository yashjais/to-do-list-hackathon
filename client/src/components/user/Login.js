import React from 'react'
import { TextField, Button } from '@material-ui/core';
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }
    handleInputChange = (e) => {
        // console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        // console.log('clicked')
        const body = {}
        body.email = this.state.email
        body.password = this.state.password
        axios.post('/user/login', body)
            .then(response => {
                // console.log(response)
                if (response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                    })
                } else if (response.data == "invalid email/password") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                    })
                } else {
                    const token = response.data
                    // console.log(token)
                    localStorage.setItem('authToDoToken', token)
                    Swal.fire(
                        'Good job!',
                        'Successfully logged in',
                        'success'
                    )
                    window.location.reload('/')
                }
            })
            .catch(err => {
                // console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: 'Validation failed',
                })

            })
    }
    render() {
        return (
            <div style={{ textAlign: "center", background: 'rgba(202, 233, 255)', color: 'rgba(27, 73, 101)', height: '90vh' }}>
                <br />
                <br />
                <h2>Sign In</h2>
                <br />

                <TextField id="standard-basic" label="Email" name="email" value={this.state.email} onChange={this.handleInputChange} /> <br /> <br />
                <TextField id="standard-basic" label="Password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} /> <br /> <br />
                <Button variant="contained" onClick={this.handleSubmit} color="primary">
                    Submit
            </Button>
            </div>
        )
    }
}

export default Login