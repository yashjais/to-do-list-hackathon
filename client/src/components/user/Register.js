import React from 'react'
import { TextField, Button } from '@material-ui/core';
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            mobile: ''
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
        body.mobile = this.state.mobile
        axios.post('/user/register', body)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    // console.log(response.data.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Validation failed',
                    })
                } else if (response.data.hasOwnProperty('errmsg')) {
                    // console.log(response.data.errmsg)
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter valid values',
                        text: 'Enter another credentials',
                    })
                } else {
                    // console.log(response.data, 'in else')
                    Swal.fire(
                        'Good job!',
                        'Successfully created account',
                        'success'
                    )
                    this.props.history.push('/sign_in')
                }
            })
            .catch(err => {
                // console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some error occured'
                })
            })
    }
    render() {
        return (
            <div style={{ textAlign: "center", background: 'rgba(202, 233, 255)', color: 'rgba(27, 73, 101)', height: '90vh' }}>
                <br />
                <br />
                <h2>Sign Up</h2>
                <br />

                <TextField id="standard-basic" label="Email" name="email" value={this.state.email} onChange={this.handleInputChange} /> <br /> <br />
                <TextField id="standard-basic" label="Password" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} /> <br /> <br />
                <TextField id="standard-basic" label="Mobile" name="mobile" value={this.state.mobile} onChange={this.handleInputChange} /> <br /> <br />
                <Button variant="contained" onClick={this.handleSubmit} color="primary">
                    Submit
            </Button>
            </div>
        )
    }
}

export default Register