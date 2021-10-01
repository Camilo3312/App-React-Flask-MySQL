import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [msgError, setMsgerror] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])

    // Metohds inster | update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    image
                })
            })
            const data = await res.json();
            setMsgerror(data['message'])
        }

        else {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    image: image
                })
            })

            setEditing(false)

            const data = await res.json();
            setMsgerror(data['message'])
        }

        await getUsers();

        setName('');
        setEmail('');
        setPhone('');
        setImage('');
    }

    // Method get registers
    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data)
    }

    // Method delete registers
    const deleteUser = async (id) => {
        const useResponse = window.confirm('Are you sure you want to delete it?')
        if (useResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            })

            const data = await res.json();
            await getUsers();
            setMsgerror(data['message'])
        }
    }

    // Metohs update registers
    const updateUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json()

        setEditing(true);

        setId(id);

        setName(data[1])
        setEmail(data[2])
        setPhone(data[3])
        setImage(data[4])
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="row">
            
            {/* Form */}
            <div className="col-md-8">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">

                        <input type="text" name="name"
                            onChange={e => setName(e.target.value)}
                            value={name} className="form-control"
                            placeholder="Name" autoFocus
                        />

                    </div>

                    <div className="form-group">

                        <input type="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} className="form-control"
                            placeholder="Email"
                        />

                    </div>

                    <div className="form-group">

                        <input type="text"
                            onChange={e => setPhone(e.target.value)}
                            value={phone} className="form-control"
                            placeholder="Phone"
                        />

                    </div>

                    <div className="form-group">

                        <input type="text"
                            onChange={e => setImage(e.target.value)}
                            value={image} className="form-control"
                            placeholder="Image"
                        />

                    </div>

                    <button className="btn btn-primary btn-block" >
                        {editing ? 'update' : 'create'}
                    </button>

                </form>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{msgError}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>

            {/* Table */}
            <div className="col-md-8">

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Image</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user[0]}>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>{user[3]}</td>

                                <td>not found</td>
                                <td>
                                    <button className="btn btn-secondary btn-block"
                                        onClick={() => updateUser(user[0])}>Edit</button>
                                    <button className="btn btn-danger btn-block"
                                        onClick={() => deleteUser(user[0])}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}