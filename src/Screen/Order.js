import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle, Row } from 'react-bootstrap'
import axios from 'axios'

const Order = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [userName, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [comment, setComment] = useState("")

    const [Delete, setDelete] = useState(false)
    //Id for update record and Delete
    const [id, setId] = useState("");
    const handleEditShow = () => { SetEditShow(true); console.log(RowData); }

    const GetOrderData = () => {
        //here we will get all Order data
        const url = 'https://localhost:7032/api/Order'
        axios.get(url)
            .then(response => {
                console.log(response)
                const result = response.data;

                setData(result)
                console.log(result)

            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'https://localhost:7032/api/Order'

        axios.post(url)
            .then(response => {
                const result = response.data;



                window.location.reload()

            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () => {

        const url = `https://localhost:7032/api/Order/` + RowData.id
        axios.put(url,
            {
                "id": id,
                "dateFrom": dateFrom,
                "dateTo": dateTo,
                "userName": userName,
                "phoneNumber": phoneNumber,
                "comment": comment,
                "carId": 1
            })
            .then(response => {
                const result = response.data;

                console.log(setDateFrom)
                window.location.reload()

            })
            .catch(err => {
                console.log(err)
            })
    }
    //handle Delete Function 
    const handleDelete = () => {
        const url = `https://localhost:7032/api/Order/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;


                window.location.reload()

            })
            .catch(err => {
                console.log(err)
            })
    }
    //call this function in useEffect
    console.log(ViewShow, RowData)
    useEffect(() => {
        GetOrderData();
    }, [ViewEdit])
    return (
        <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Add New Order
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date From</th>
                                <th>Date To</th>
                                <th>User Name</th>
                                <th>Phone Number</th>
                                <th>Comment</th>
                                <th>Car Type</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.dateFrom}</td>
                                    <td>{item.dateTo}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.comment}</td>
                                    <td>{item.car.carType}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setId(item.id), setPhoneNumber(item.phoneNumber), setUserName(item.userName), setDateFrom(item.dateFrom), setDateTo(item.dateTo), setComment(item.comment)) }}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item), setId(item.id), setDelete(true)) }}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Order Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.dateFrom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dateTo} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.userName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.phoneNumber} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.comment} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Order</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="date" className='form-control' onChange={(e) => setDateFrom(e.target.value)} placeholder="Please enter Date From" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="date" className='form-control' onChange={(e) => setDateTo(e.target.value)} placeholder="Please enter Date To" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setUserName(e.target.value)} placeholder="Please enter Number" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Please enter NIC" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setComment(e.target.value)} placeholder="Please enter Address" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Order</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit Order record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setDateFrom(e.target.value)} placeholder="Please enter Date From" defaultValue={RowData.dateFrom} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setDateTo(e.target.value)} placeholder="Please enter email" defaultValue={RowData.dateTo} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setUserName(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.userName} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>NIC</label>
                                <input type="text" className='form-control' onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.phoneNumber} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="text" className='form-control' onChange={(e) => setComment(e.target.value)} placeholder="Please enter Address" defaultValue={RowData.comment} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Order</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Order;