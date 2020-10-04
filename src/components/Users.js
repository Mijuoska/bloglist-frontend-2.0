import React, { useState, useEffect } from 'react'
import userService from '../services/users'


const Users = () => {
const [users, setUsers] = useState([])
console.log(users)

useEffect(() => {
    userService.getAll().then(users => {
        setUsers(users)
    })
}, [])

return (
    <div>
    <h2>Users</h2>
    <div>
    <table>
    <th></th>
    <th>Blogs created</th>
    {users.map(user => <tr><td>{user.name}</td>{user.blogs.length}</tr>)}
    </table>
    </div>
    </div>
)

}

export default Users