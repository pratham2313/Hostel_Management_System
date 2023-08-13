import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {
    var [studentdata, setstudentdata] = useState([]);

    var [getdata, setgetdata] = useState({ id: "", studentName: "", studentEmail: "", studentMobile: "", studentAddress: "", studentPassword: "" });
    // var [updatedata, setupdatedata] = useState({ id: "", studentname: "", studentaddress: "", studentmobile: "", studentemail: "" });
    useEffect(() => {
        const fetchstudent = async () => {
            await axios.get("https://localhost:7082/api/Students").then((res) => {
                console.log(res.data[0].studentName);
                const data = res.data;
                setstudentdata(data);
            });
        };
        fetchstudent();

    }, []);

    var tempid;
    var [updateid, setid] = useState({ id: "" });
    const addvalue = (event, id) => {
        tempid = id;
        console.log(tempid);
    };
    const addvalue1 = (event, id) => {
        tempid = id;
        setid({ id: id });
        console.log(updateid.id);
        searchStudentRecord(tempid);
    };

    const deleteStudentRecord = (e) => {
        axios.delete("https://localhost:7082/api/Students/" + tempid).then(() => {
            toast.success("student deleted from records");
        })
        window.location.reload(true)
    }
    const handleInput = (e) => {
        setgetdata({ ...getdata, [e.target.name]: e.target.value });
    }
    const updateStudentRecord = (e) => {
        axios.put("https://localhost:7082/api/Students/" + updateid.id, getdata).then(() => {
            toast.success("successfully edit student record");
        })
        window.location.reload(true)
    }
    const searchStudentRecord = async (id) => {
        console.log("in serach");
        await axios.get("https://localhost:7082/api/Students/" + id).then((res) => {
            setgetdata({
                id: res.data.id,
                studentName: res.data.studentName,
                studentEmail: res.data.studentEmail,
                studentMobile: res.data.studentMobile,
                studentAddress: res.data.studentAddress,
                studentPassword: res.data.studentPassword,
            })

        });

    }

    return (
        <div>
            <div class="container-xl">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h2>Manage <b>Student</b></h2>
                                </div>
                                <div class="col-sm-6">
                                    <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"> <span class="material-icons">+ Add New Employee</span></a>
                                    <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><span class="material-icons">- Delete</span></a>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span class="custom-checkbox">
                                            <input type="checkbox" id="selectAll" />
                                            <label for="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentdata.map(student => (
                                        <>
                                            <tr>
                                                <td>
                                                    <span class="custom-checkbox">
                                                        <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                                        <label for="checkbox1"></label>
                                                    </span>
                                                </td>
                                                <td>{student.id}</td>
                                                <td>{student.studentName}</td>
                                                <td>{student.studentEmail}</td>
                                                <td>{student.studentAddress}</td>
                                                <td>{student.studentMobile}</td>
                                                <td>
                                                    <a onClick={e => addvalue1(e, student.id)} href="#editEmployeeModal" class="edit material-icons" data-toggle="modal" title="Edit" style={{ fontSize: "25px" }}>✎</a><span>      </span>
                                                    <a onClick={e => addvalue(e, student.id)} href="#deleteEmployeeModal" class="delete material-icons" data-toggle="modal" title="Delete" style={{ fontSize: "25px" }}>🗑</a>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            <div id="addEmployeeModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Add Employee</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" required />
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" required />
                                </div>
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea class="form-control" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" class="form-control" required />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input type="submit" class="btn btn-success" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="editEmployeeModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Employee</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Student Id</label>
                                    <span name="id" type="text" class="form-control">{getdata.id}</span>
                                </div>
                                <div class="form-group">
                                    <label>Name</label>
                                    <input onChange={e => handleInput(e)} name='studentName' type="text" class="form-control" required value={getdata.studentName} />
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input onChange={e => handleInput(e)} name='studentEmail' type="email" class="form-control" required value={getdata.studentEmail} />
                                </div>
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea onChange={e => handleInput(e)} name='studentAddress' class="form-control" required value={getdata.studentAddress}></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input onChange={e => handleInput(e)} name='studentMobile' type="text" class="form-control" required value={getdata.studentMobile} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input onClick={e => updateStudentRecord(e)} type="button" class="btn btn-info" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="deleteEmployeeModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Delete Employee</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete these Records?</p>
                                <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input onClick={e => deleteStudentRecord(e)} type="button" class="btn btn-danger" value="Delete" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Table