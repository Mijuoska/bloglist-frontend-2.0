import React from 'react'
import { Link } from 'react-router-dom'


const Users = ( { users }) => {
return (
    <div>
    <h2 className="text-lg font-semibold ml-16">Users</h2>
    <div className="mt-4">
    <table className="ml-4 table-auto">
    <tbody>
    <tr><th className="px-4 py-2">User</th><th className="px-4 py-2">Blogs created</th></tr>
    {users.map(user => <tr key={user.id}><td className="border px-4 py-2"><Link to={`/users/${user.id}`}>{user.name}</Link></td>
    <td className="border px-4 py-2">{user.blogs.length}</td></tr>)}
    </tbody>
    </table>
    </div>
    </div>
)

}

export default Users