import React from 'react'
import axios from "../../config/axios";

class ListTasks extends React.Component {
    constructor() {
        super()
        this.state = {
            tasks: []
        }
    }
    componentDidMount() {
        axios.get('/tasks', {
            headers: {
                'x-auth': localStorage.getItem('authToDoToken')
            }
        })
            .then(res => {
                console.log(res.data)
                const tasks = res.data
                this.setState({ tasks })
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div style={{ textAlign: "center", background: 'rgba(202, 233, 255)', color: 'rgba(27, 73, 101)', minHeight: '90vh' }}>
                <br />
                <br />
                <h1>Listing of the Tasks</h1>
                {
                    this.state.tasks.length == 0 ? <p> No tasks found </p> : this.state.tasks.map(task => {
                        return (
                            <li> {task.title} - {task.label} - {task.status} </li>
                        )
                    })
                }
            </div>
        )
    }
}

export default ListTasks