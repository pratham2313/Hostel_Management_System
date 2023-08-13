import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slidebar from './slidebar';
import { useNavigate } from 'react-router-dom';

function Table_roomAllotment() {
    var [fullropminfo, setfullropminfo] = useState([]);
    var [counter, setcounter] = useState(0);
    var [fullstudentinfo, setfullstudentinfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    var [getdata, setgetdata] = useState({ roomId: "", roomNumber: "", numberofstudent: "", roomType: "", roomStatus: "", roomstdentId: "", fid: "", sid: "", tid: "" });
    var [studentroom, setstudentroom] = useState({ roomstdentId: "", fid: "", sid: "", tid: "" });
    var navigate = useNavigate();
    useEffect(() => {
        var islogin = localStorage.getItem("islogin");
        if (islogin == null) {
            navigate("/login");
        }
        const fetchstudent = async () => {
            await axios.get("https://localhost:7082/FullRoomInfo").then((res) => {
                // console.log(res.data[0].studentName);
                const data = res.data;
                setfullropminfo(data);
            });
        };
        fetchstudent();

    }, []);


    var [updateid, setid] = useState({ id: "" });
    var [roomid, setroomid] = useState({ id: "" });
    const addvalue1 = async (event, id, fid, sid, tid, roomid, roomnumber, numberofstudent) => {

        setid({ id: id });

        setroomid({ id: roomid });

        var id = { roomstdentId: id, fid: fid, sid: sid, tid: tid }
        setstudentroom({ ...studentroom, ...id });
        await axios.get("https://localhost:7082/StudentFeeInfo").then((res) => {
            const data = res.data;
            setfullstudentinfo(data);

        })
        setShowModal(true);


    };
    const Onclose = (event) => {
        setShowModal(false);
        // window.location.reload(true)
    }
    const handleInput = (e) => {
        setstudentroom({ ...studentroom, [e.target.name]: e.target.value });

    }
    const updateRoomRecord = (e) => {

        setgetdata({ ...getdata, numberofstudent: counter });

        axios.put("https://localhost:7082/api/roomofstudents/" + updateid.id, studentroom).then(() => {
            toast.success("successfully edit student record");
        })
        window.location.reload(true)
    }
    useEffect(() => {
        axios.get("https://localhost:7082/FullRoomInfo/" + roomid.id).then((res) => {
            console.log(res.data);

            setgetdata({
                roomId: res.data.roomId,
                roomNumber: res.data.roomNumber,
                numberofstudent: res.data.numberofstudent,
                roomType: res.data.roomType,
                roomStatus: res.data.roomStatus,
                roomstdentId: res.data.roomstdentId,
                fid: res.data.fid,
                sid: res.data.sid,
                tid: res.data.tid
            })


        });
    }, [showModal])
    return (
        <div>
            <Slidebar />
            <div class="p-2 sm:ml-64">
                <div class="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Room Allocation
                    </h2>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" class=" text-center px-6 py-3">
                                        IndexNo.
                                    </th>
                                    <th scope="col" class="text-center px-6 py-3">
                                        Room  Number
                                    </th>
                                    <th scope="col" class=" text-center px-6 py-3">
                                        First Studentid
                                    </th>
                                    <th scope="col" class="text-center px-6 py-3">
                                        Second Studentid
                                    </th>
                                    <th scope="col" class=" text-center px-6 py-3">
                                        Third Studentid
                                    </th>

                                    <th scope="col" class=" px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fullropminfo.map((room, index) => (
                                        <>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {room.roomNumber}
                                                </th>
                                                <td class="text-center px-6 py-4">
                                                    {room.fid}
                                                </td>
                                                <td class="text-center px-6 py-4">
                                                    {room.sid}
                                                </td>
                                                <td class="text-center px-6 py-4">
                                                    {room.tid}
                                                </td>


                                                <td class="flex  items-center px-6 py-4 space-x-3">
                                                    <a onClick={(e) => addvalue1(e, room.roomstdentId, room.fid, room.sid, room.tid, room.roomId, room.roomNumber, room.numberofstudent)} href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{ fontSize: "25px" }}>✎</a>
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
                                            </div>
                                            {/*body*/}
                                            <div className="relative p-8 flex-auto">
                                                <div class="px-10 py-6 lg:px-8">

                                                    <form class="space-y-6" action="#">
                                                        <div>
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Number</label>
                                                            <span name="roomNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={studentroom.roomNumber} required >{getdata.roomNumber}</span>
                                                        </div>
                                                        <div>
                                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Student Id</label>
                                                            <select name='fid' onChange={e => handleInput(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                <option>Select Options</option>
                                                                <option>0</option>
                                                                {
                                                                    fullstudentinfo.map((student, Index) => (
                                                                        <option>{student.studentId}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Second Student Id</label>
                                                            <select name='sid' onChange={e => handleInput(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                <option>Select Options</option>
                                                                <option>0</option>
                                                                {
                                                                    fullstudentinfo.map((student, Index) => (
                                                                        <option>{student.studentId}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Third Student Id</label>
                                                            <select name='tid' onChange={e => handleInput(e)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                <option>Select Options</option>
                                                                <option>0</option>
                                                                {
                                                                    fullstudentinfo.map((student, Index) => (
                                                                        <option>{student.studentId}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                                                <button onClick={e => updateRoomRecord(e)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >
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

export default Table_roomAllotment