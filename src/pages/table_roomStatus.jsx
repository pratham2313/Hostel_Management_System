import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slidebar from './slidebar';
import { useNavigate } from 'react-router-dom';

function Table_roomStatus() {
    var [roomdata, setroomdata] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showdelete, setdelete] = useState(false);
    const [showaddmodel, setaddmodel] = useState(false);
    const [showoptions, setoption] = useState(true);
    var [getdata, setgetdata] = useState({ roomNumber: "", roomType: "", numberofstudent: 0, studentsid: { fid: 0, sid: 0, tid: 0 } });
    var [addstudent, setaddstudent] = useState({ studentName: "", studentEmail: "", studentMobile: "", studentAddress: "", studentPassword: "", confirmPass: "", fees: { paymentMethod: "", feeStatus: "" } });
    var navigate = useNavigate();
    useEffect(() => {
        var islogin = localStorage.getItem("islogin");
        if (islogin == null) {
            navigate("/login");
        }
        const fetchstudent = async () => {
            await axios.get("https://localhost:7082/api/Rooms").then((res) => {
                console.log(res.data);
                const data = res.data;
                setroomdata(data);
            });
        };
        fetchstudent();

    }, []);


    const Onclose = (event) => {
        setShowModal(false);
        setaddmodel(false);
        setoption(true);
        // window.location.reload(true)
    }
    const Addroom = async (e) => {
        //console.log(addstudent);
        if (getdata.roomNumber > 100 && (getdata.roomType == 3 || getdata.roomType == 5)) {
            //console.log("in if");
            await axios.post("https://localhost:7082/api/Rooms", getdata).then((res) => {
                console.log(res);
                toast.success("Room Added successfully");
            })
            window.location.reload(true)
        }
        else {
            toast.error("Room Number Must be grater than 100 and room type must be 3 and 5");
        }

    }
    var feesvalue = { fees: { paymentMethod: "", feeStatus: "" } }
    var [fees, setfees] = useState({ paymentMethod: "", feeStatus: "" });
    const handleInput1 = (e) => {
        setgetdata({ ...getdata, [e.target.name]: e.target.value });
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

    return (
        <div>
            <Slidebar />
            <div class="p-2 sm:ml-64">
                <div class="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Room Status
                    </h2>
                    <button onClick={() => setaddmodel(true)} type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">+ Add Room</button>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" class="px-6 py-3 text-center">
                                        IndexNo.
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Room Number
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Current #Student
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Empty Space
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roomdata.map((room, index) => (
                                        <>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <th scope="row" class="px-6 py-1 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <th scope="row" class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {room.roomNumber}
                                                </th>
                                                <td class="px-6 py-4 text-center">
                                                    {room.numberofstudent}
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    {(room.roomType - room.numberofstudent)}
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }


                            </tbody>
                        </table>

                        {showaddmodel ? (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                            {/*header*/}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-bold dark:text-white">
                                                    Add Room
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
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Number</label>
                                                            <input onChange={e => handleInput1(e)} type="text" name='roomNumber' placeholder="100" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                        </div>
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Type</label>
                                                            <input onChange={e => handleInput1(e)} type="text" name='roomType' placeholder="3,5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center  justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                                                <button onClick={e => Addroom(e)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >
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


                    </div>


                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Table_roomStatus