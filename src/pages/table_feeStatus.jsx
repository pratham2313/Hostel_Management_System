import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slidebar from './slidebar';

function Table_feeStatus() {
    var [studentdata, setstudentdata] = useState([]);
    var [color, setcolor] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showdelete, setdelete] = useState(false);
    const [showoptions, setoption] = useState(true);
    var [getdata, setgetdata] = useState({ id: "", studentName: "", studentEmail: "", studentMobile: "", studentAddress: "", studentPassword: "", feeId: "", paymentMethod: "", feeStatus: "" });
    var navigate = useNavigate();
    useEffect(() => {
        var islogin = localStorage.getItem("islogin");
        if (islogin == null) {
            navigate("/login");
        }
        const fetchstudent = async () => {
            await axios.get("https://localhost:7082/StudentFeeInfo").then((res) => {
                console.log(res.data);
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

    var feesvalue = { paymentMethod: "", feeStatus: "" }
    var [fees, setfees] = useState({ paymentMethod: "", feeStatus: "" });
    const handleinput2 = (e) => {
        if (e.target.value == "Paid") {
            setoption(false);
        }
        if (e.target.value == "Unpaid") {
            setoption(true);
        }
        if (e.target.name == "paymentMethod") {

            feesvalue.feeStatus = fees.feeStatus;
            feesvalue.paymentMethod = e.target.value;

            setgetdata({ ...getdata, ...feesvalue });
        }
        if (e.target.name == "feeStatus") {

            setfees({ feeStatus: e.target.value });
            if (e.target.value == "Unpaid") {
                feesvalue.feeStatus = e.target.value;
                feesvalue.paymentMethod = " - ";
                setgetdata({ ...getdata, ...feesvalue });
            }
            if (e.target.value == "Paid") {
                feesvalue.feeStatus = e.target.value;
                feesvalue.paymentMethod = "Online";
                setgetdata({ ...getdata, ...feesvalue });
            }

        }
    }
    const Onclose = (event) => {
        setShowModal(false);
        setoption(true);
        // window.location.reload(true)
    }
    const updateStudentRecord = (e) => {
        axios.put("https://localhost:7082/api/Fees/" + updateid.id, getdata).then(() => {
            toast.success("successfully edit student record");
        })
        window.location.reload(true)
    }
    const deleteStudentRecord = (e) => {
        axios.delete("https://localhost:7082/api/Fees/" + deleteid.id).then(() => {
            toast.success("student deleted from records");
        })
        window.location.reload(true)
    }

    useEffect(() => {
        console.log("i am showmodel")
        axios.get("https://localhost:7082/api/Students/" + updateid.id).then((res) => {
            setgetdata({
                id: res.data.id,
                studentName: res.data.studentName,
                studentEmail: res.data.studentEmail,
                studentMobile: res.data.studentMobile,
                studentAddress: res.data.studentAddress,
                studentPassword: res.data.studentPassword,
                feeId: res.data.fee_id,
            })

        });
    }, [showModal]);



    return (
        <div>
            <Slidebar />
            <div class="p-2 sm:ml-64">
                <div class="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Manage Fee-Status</h2>
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
                                        FeeStatus
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        PaymentMethod
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
                                                    {student.studentId}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {student.studentName}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {student.studentEmail}
                                                </td>
                                                <td id='color' class="px-6 py-4">
                                                    {student.studentfeeStatus}
                                                </td>
                                                <td class="px-6 py-4 " >
                                                    {student.studentpaymentMethod}
                                                </td>

                                                <td class="flex items-center px-6 py-4 space-x-3">

                                                    <a onClick={(e) => addvalue1(e, student.studentId)} href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{ fontSize: "25px" }}>✎</a>

                                                    <a onClick={(e) => addvalue(e, student.studentFeeId)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" style={{ fontSize: "25px" }}>🗑</a>
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
                                                            <span name='studentName' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={getdata.studentName} required>{getdata.studentName}</span>
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
                        {
                            showdelete ? (
                                <>
                                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div class="relative w-full max-w-md max-h-full">
                                            <!-- Modal content -->
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                                <div class="px-6 py-6 lg:px-8">
                                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>

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

export default Table_feeStatus