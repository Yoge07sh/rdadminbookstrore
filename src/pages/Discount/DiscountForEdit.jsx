import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from 'react'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

function DiscountForEdit() {
    const params = useParams();
    const id = params.id
    const navigate = useNavigate();
    const [discount, setDiscount] = useState({
        book: '',
        discountName: '',
        discountType: '',
        discountValue: 0,
        validFrom: '',
        validUpto: '',
    });
    const [books, setBooks] = useState([])


    useEffect(() => {
        axios({
            url: apiUrl + '/discount/for/edit/' + id,
            method: 'get'
        }).then((res) => {
            setDiscount(res.data.data)
            setBooks(res.data.books)
        })
            .catch((err) => {
                alert(err);
            })
    }, [id])

    function manageUpdate(e) {
        let name = e.target.name
        let value = e.target.value
        setDiscount((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const editDiscount = () => {
        axios({
            url: apiUrl + '/edit/discount/' + id,
            method: 'put',
            data: discount
        }).then(() => {
            navigate('/discounts')
        })
            .catch((err) => {
                alert(err)
            })
    }
    const handleSubmit = () => { 
        editDiscount();
    }
    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <h3 className='mt-5 text-center text-danger'>Edit Discount on Book</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Select Book</Form.Label>
                            <Form.Select onChange={manageUpdate} name="book" value={discount.book}>
                                {
                                    books.map((b) =>
                                        <option value={b._id}>{b.bookTittle}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Form.Group>
                        <Form.Label>Discount Name</Form.Label>
                        <Form.Control type='text' name="discountName" value={discount.discountName} onChange={manageUpdate}></Form.Control>
                    </Form.Group>
                </Row>
                <Row className='mt-2'>
                    <Form.Group>
                        <Form.Label>Discount Type</Form.Label>
                        <Form.Select onChange={manageUpdate} name="discountType" value={discount.discountType}>
                            <option value=''>---select---</option>
                            <option value='Percentage'>Percentage</option>
                            <option value='Fixed'>Fixed</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className='mt-2'>
                    <Form.Group>
                        <Form.Label>Discount Value in Number Only</Form.Label>
                        <Form.Control type='number' name="discountValue" value={discount.discountValue} onChange={manageUpdate}></Form.Control>
                    </Form.Group>
                </Row>
                <Row className='mt-2'>
                    <Form.Group>
                        <Form.Label>Valid From</Form.Label>
                        <Form.Control type='date' name="validFrom" value={discount.validFrom.split('T')[0]} onChange={manageUpdate}></Form.Control>
                    </Form.Group>
                </Row>
                <Row className='mt-2'>
                    <Form.Group>
                        <Form.Label>Valid Upto</Form.Label>
                        <Form.Control type='date' name="validUpto" value={discount.validUpto.split('T')[0]} onChange={manageUpdate}></Form.Control>
                    </Form.Group>
                </Row>
                <Button className='mt-3' variant='success' onClick={handleSubmit} >Add Discount</Button>
            </Form>

        </Container>
    )
}

export default DiscountForEdit;