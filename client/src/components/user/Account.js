import React from 'react'
import axios from '../../config/axios'

class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            mobile: ''
        }
    }
    componentDidMount() {
        axios.get('/user/account', {
            headers: {
                'x-auth': localStorage.getItem('authToDoToken')
            }
        })
            .then(res => {
                // console.log(res.data)
                const email = res.data.email
                const mobile = res.data.mobile
                this.setState({ email, mobile })
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div style={{ textAlign: "center", background: 'rgba(202, 233, 255)', color: 'rgba(27, 73, 101)', height: '90vh' }}>
                <br />
                <br />
                <h2>Details</h2>
                <br />
                <h3>Email - {this.state.email}</h3>
                <h3>Mobile - {this.state.mobile}</h3>
            </div>
        )
    }
}

export default Account