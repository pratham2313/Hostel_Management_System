import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slidebar from './slidebar';
import { useNavigate } from 'react-router-dom';

function Table() {
    var [studentdata, setstudentdata] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showdelete, setdelete] = useState(false);
    const [showaddmodel, setaddmodel] = useState(false);
    const [showoptions, setoption] = useState(true);
    var [getdata, setgetdata] = useState({ id: "", studentName: "", studentEmail: "", studentMobile: "", studentAddress: "", studentPassword: "", fee_id: "", fees: { paymentMethod: "", feeStatus: "" } });
    var [addstudent, setaddstudent] = useState({ studentName: "", studentEmail: "", studentMobile: "", studentAddress: "", studentPassword: "", confirmPass: "", fees: { paymentMethod: "", feeStatus: "" } });
    var navigate = useNavigate();
    useEffect(() => {
        var islogin = localStorage.getItem("islogin");
        if (islogin == null) {
            navigate("/login");
        }
        const fetchstudent = async () => {
            await axios.get("https://localhost:7082/api/Students").then((res) => {
                // console.log(res.data[0].studentName);
                const data = res.data;
                setstudentdata(data);
            });
        };
        fetchstudent();

    }, []);

    var [deleteid, setdid] = useState({ id: "" });
    var [updateid, setid] = useState({ id: "" });
    const addvalue = (event, id) => {
        setdid({ id: id });
        setdelete(true);
    };
    const addvalue1 = (event, id) => {
        setShowModal(true);
        setid({ id: id });


    };
    const Onclose = (event) => {
        setShowModal(false);
        setaddmodel(false);
        setoption(true);
        // window.location.reload(true)
    }
    const AddStudentRecord = async (e) => {
        console.log(addstudent);
        if (addstudent.studentPassword == addstudent.confirmPass) {
            await axios.post("https://localhost:7082/api/Students/", addstudent).then(() => {
                toast.success("student Added successfully");
            })
            window.location.reload(true)
        }
        else {
            toast.error("Password and Confirm Password not same");
        }

    }

    const deleteStudentRecord = (e) => {
        axios.delete("https://localhost:7082/api/Fees/" + deleteid.id).then(() => {
            toast.success("student deleted from records");
        })
        window.location.reload(true)
    }
    const handleInput = (e) => {

        setgetdata({ ...getdata, [e.target.name]: e.target.value });
    }
    var feesvalue = { fees: { paymentMethod: "", feeStatus: "" } }
    var [fees, setfees] = useState({ paymentMethod: "", feeStatus: "" });
    const handleInput1 = (e) => {
        setaddstudent({ ...addstudent, [e.target.name]: e.target.value });
    }
    const handleinput2 = (e) => {
        if (e.target.value == "Paid") {
            setoption(false);
        }
        if (e.target.value == "Unpaid") {
            setoption(true);
        }
        if (e.target.name == "paymentMethod") {

            feesvalue.fees.feeStatus = fees.feeStatus;
            feesvalue.fees.paymentMethod = e.target.value;

            setaddstudent({ ...addstudent, ...feesvalue });
        }
        if (e.target.name == "feeStatus") {

            setfees({ feeStatus: e.target.value });
            if (e.target.value == "Unpaid") {
                feesvalue.fees.feeStatus = e.target.value;
                feesvalue.fees.paymentMethod = " - ";
                setaddstudent({ ...addstudent, ...feesvalue });
            }

        }
    }
    const updateStudentRecord = (e) => {

        console.log(getdata);
        axios.put("https://localhost:7082/api/Students/" + updateid.id, JSON.stringify(getdata), { headers: { 'Content-Type': 'application/json' } }).then(() => {
            toast.success("successfully edit student record");
        })
        window.location.reload(true)
    }
    useEffect(() => {
        axios.get("https://localhost:7082/api/Students/" + updateid.id).then((res) => {

            setgetdata({
                id: res.data.id,
                studentName: res.data.studentName,
                studentEmail: res.data.studentEmail,
                studentMobile: res.data.studentMobile,
                studentAddress: res.data.studentAddress,
                studentPassword: res.data.studentPassword,
                fee_id: res.data.fee_id,
                fees: { paymentMethod: "", feeStatus: "" },
            })
            // console.log(getdata.fee_id);
            //console.log(getdata);

        });
    }, [showModal])
    return (
        <div>
            <Slidebar />
            <div class="p-2 sm:ml-64">
                <div class="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Manage Student</h2>
                    <button onClick={() => setaddmodel(true)} type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">+ Add Student</button>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" class="px-6 py-3">
                                        IndexNo.
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Phonenumber
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentdata.map((student, index) => (
                                        <>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {student.id}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {student.studentName}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {student.studentEmail}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {student.studentAddress}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {student.studentMobile}

                                                </td>

                                                <td class="flex items-center px-6 py-4 space-x-3">

                                                    <a onClick={(e) => addvalue1(e, student.fee_id)} href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{ fontSize: "25px" }}>✎</a>

                                                    <a onClick={(e) => addvalue(e, student.fee_id)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" style={{ fontSize: "25px" }}>🗑</a>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }


                            </tbody>
                        </table>
                        {showModal ? (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-bold dark:text-white">
                                                    Edit
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-8 flex-auto">
                                                <div class="px-10 py-6 lg:px-8">

                                                    <form class="space-y-6" action="#">
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Id</label>
                                                            <span name="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.id} required >{getdata.id}</span>
                                                        </div>
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                                                            <input onChange={e => handleInput(e)} type="text" name='studentName' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.studentName} required />
                                                        </div>
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
                                                            <input onChange={e => handleInput(e)} type="email" name='studentEmail' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.studentEmail} required />
                                                        </div>
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Address</label>
                                                            <textarea onChange={e => handleInput(e)} type="email" name='studentAddress' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.studentAddress} required />
                                                        </div>
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Phone</label>
                                                            <input onChange={e => handleInput(e)} type="text" name='studentMobile' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.studentMobile} required />
                                                        </div>


                                                    </form>
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                                                <button onClick={e => updateStudentRecord(e)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                                    type="button"
                                                    onClick={(e) => Onclose(e)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                        {showaddmodel ? (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-bold dark:text-white">
                                                    Add Student
                                                </h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-8 flex-auto">
                                                <div class="px-10 py-6 lg:px-8">

                                                    <form class="space-y-6" action="#">
                                                        <div class="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                                                                <input onChange={e => handleInput1(e)} type="text" name='studentName' placeholder="Naruto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                            <div>
                                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
                                                                <input onChange={e => handleInput1(e)} type="email" name='studentEmail' placeholder="naruto@gmail.com" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                        </div>
                                                        <div class="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Address</label>
                                                                <textarea onChange={e => handleInput1(e)} type="email" name='studentAddress' placeholder="abc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                            <div>
                                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Phone</label>
                                                                <input onChange={e => handleInput1(e)} type="text" name='studentMobile' placeholder="9999999999" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                        </div>
                                                        <div class="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student password</label>
                                                                <input onChange={e => handleInput1(e)} type="password" name="studentPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                            <div>
                                                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                                                <input onChange={e => handleInput1(e)} type="password" name="confirmPass" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                            </div>
                                                        </div>
                                                        <div class="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee Status</label>
                                                                <select name='feeStatus' onChange={e => handleinput2(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                    <option>Select Options</option>
                                                                    <option>Paid</option>
                                                                    <option>Unpaid</option>
                                                                </select>
                                                            </div>


                                                            <div>
                                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
                                                                <select name='paymentMethod' onChange={e => handleinput2(e)} disabled={showoptions} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                    <option>Select Options</option>
                                                                    <option>Online</option>
                                                                    <option>Offline</option>

                                                                </select>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center  justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                                                <button onClick={e => AddStudentRecord(e)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                                    type="button"
                                                    onClick={(e) => Onclose(e)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                        {
                            showdelete ? (
                                <>
                                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}

                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                                {/*body*/}
                                                <div className="relative p-2 flex-auto">
                                                    <div class="px-10 py-2 lg:px-8">
                                                        <div class="p-6 text-center">
                                                            <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 font-blod">Are you sure you want to delete this student record?</h3>
                                                            <button onClick={(e) => deleteStudentRecord(e)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                                Yes, I'm sure
                                                            </button>
                                                            <button onClick={() => setdelete(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null
                        }

                    </div>


                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Table