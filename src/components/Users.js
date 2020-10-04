import React from 'react'
import { Link } from 'react-router-dom'


const Users = ( { users }) => {

return (
    <div>
    <h2>Users</h2>
    <div>
    <table>
    <tbody>
    <tr><th></th><th>Blogs created</th></tr>
    {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
    </tbody>
    </table>
    </div>
    </div>
)

}

export default Users