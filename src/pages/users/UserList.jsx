import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Row, Table, Col } from 'react-bootstrap';
const apiUrl = import.meta.env.VITE_API_URL
function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios({
            url: apiUrl + '/users',
            method: 'get'
        }).then((res) => {
            setUsers(res.data.data)
        })
            .catch((err) => {
                alert(err)
            })
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-danger text-center">Users List</h2>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <td>First Name</td>
                                    <td>Last Name</td>
                                    <td>Email</td>
                                    <td>Status</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((u) =>
                                        <tr>
                                            <td>{u.firstName}</td>
                                            <td>{u.lastName}</td>
                                            <td>{u.email}</td>
                                            <td>{u.status}</td>

                                        </tr>

                                    )
                                }
                                <tr></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserList;
