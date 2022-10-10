import React, { useEffect, useState } from 'react';
import { Button, Modal, } from 'react-bootstrap'
import axios from 'axios'

const Order = () => {
    const url = 'https://localhost:7032/api/Order/'

    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const [Delete, setDelete] = useState(false)

    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }

    const [ViewEdit, SetEditShow] = useState(false)
    const hanldeEditClose = () => { SetEditShow(false) }

    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [userName, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [comment, setComment] = useState("")
    const [car, setCar] = useState("")
    const [id, setId] = useState("");

    const handleEditShow = () => { SetEditShow(true); }

    const GetOrderData = () => {

        axios.get(url)
            .then(response => {

                const result = response.data;

                setData(result)
            })

    }
    const handleSubmite = () => {

        axios.post(url,
            {
                "dateFrom": dateFrom,
                "dateTo": dateTo,
                "userName": userName,
                "phoneNumber": phoneNumber,
                "comment": comment,
                "carId": car
            })
            .then(response => {

                window.location.reload()

            })

    }
    const handleEdit = () => {

        axios.put(url + RowData.id,
            {
                "id": id,
                "dateFrom": dateFrom,
                "dateTo": dateTo,
                "userName": userName,
                "phoneNumber": phoneNumber,
                "comment": comment,
                "carId": car
            })
            .then(response => {

                window.location.reload()

            })

    }

    const handleDelete = () => {
        axios.delete(url + RowData.id)
            .then(response => {

                window.location.reload()
            })

    }


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
                                <th>Car ID</th>
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
                                    <td>{item.carId}</td>
                                    <td>{item.car.carType}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setId(item.id), setPhoneNumber(item.phoneNumber), setUserName(item.userName), setDateFrom(item.dateFrom), setDateTo(item.dateTo), setComment(item.comment)) }}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item), setId(item.id), setDelete(true)) }}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
                            <label>Date From</label>
                                <input type="text" className='form-control' value={RowData.dateFrom} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                            <label>Date TO</label>
                                <input type="text" className='form-control' value={RowData.dateTo} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                            <label>User Name</label>
                                <input type="text" className='form-control' value={RowData.userName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                            <label>Phone Number</label>
                                <input type="text" className='form-control' value={RowData.phoneNumber} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                            <label>Comment</label>
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
                                <input type="text" className='form-control' onChange={(e) => setUserName(e.target.value)} placeholder="Please enter User Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Please enter Phone Number" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setComment(e.target.value)} placeholder="Comment" />
                            </div>

                            <div class="input-group mt-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupCar">Car Type</label>
                                </div>
                                <select class="custom-select" id="inputGroupCar" onChange={(e) => setCar(e.target.value)}>
                                    <option selected>Choose...</option>
                                    <option value="1">BMW</option>
                                    <option value="2">KIA</option>
                                    <option value="3">TOYOTA</option>
                                    <option value="4">SUBARU</option>
                                </select>
                            </div>


                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Order</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

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
                                <label>Date From</label>
                                <input type="date" className='form-control' onChange={(e) => setDateFrom(e.target.value)} placeholder="Please enter Date From" defaultValue={RowData.dateFrom} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Date To</label>
                                <input type="date" className='form-control' onChange={(e) => setDateTo(e.target.value)} placeholder="Please enter Date To" defaultValue={RowData.dateTo} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>User Name</label>
                                <input type="text" className='form-control' onChange={(e) => setUserName(e.target.value)} placeholder="Please enter User Name" defaultValue={RowData.userName} />
                            </div>
                            <div className='form-group mt-3'>
                                <label> Phone Number</label>
                                <input type="number" className='form-control' onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Please enter Phone Number" defaultValue={RowData.phoneNumber} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Comment</label>
                                <input type="text" className='form-control' onChange={(e) => setComment(e.target.value)} placeholder="Optional" defaultValue={RowData.comment} />
                            </div>
                            <div class="input-group mt-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupCar">Car Type</label>
                                </div>
                                <select class="custom-select" id="inputGroupCar" onChange={(e) => setCar(e.target.value)} defaultValue={RowData.carId}>
                                    <option value="1">BMW</option>
                                    <option value="2">KIA</option>
                                    <option value="3">TOYOTA</option>
                                    <option value="4">SUBARU</option>
                                </select>
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