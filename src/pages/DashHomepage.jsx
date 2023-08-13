import React, { useEffect, useState } from 'react'
import Slidebar from './slidebar'
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';


function DashHomepage() {
    const [roomdata, setroomdata] = useState([]);
    const [count, setcount] = useState(0);
    const [studentdata, setstudentdata] = useState([]);
    const [userdata, setuserdata] = useState({});
    const [loading, setloading] = useState(true);
    //console.log("in dash")
    const navigate = useNavigate();
    const fetchroom = async () => {
        await axios.get("https://localhost:7082/FullRoomInfo").then((res) => {
            //console.log(res.data);
            const data = res.data;
            setroomdata(data);
            var count = 0;
            res.data.map((room) => {
                count = count + (room.roomType - room.numberofstudent);
                setcount(count);
            })
        });
    };
    const fetchstudent = async () => {
        await axios.get("https://localhost:7082/api/Students").then((res) => {
            // console.log(res.data[0].studentName);
            const data = res.data;
            setstudentdata(data);
        });
    };
    useEffect(() => {
        var islogin = localStorage.getItem("islogin");
        if (islogin == null) {
            navigate("/login");
        }
        else {
            fetchroom();
            fetchstudent();


            // setuserdata(localStorage.getItem(JSON.parse("userdata")));
            var data = localStorage.getItem("userdata");
            data = JSON.parse(data);
            setuserdata(data);

        }
        // console.log(userdata);
    }, [])
    const styles = {
        imageabc: {
            height: "100%",
            backgroundImage: `url(${"nadiad.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left'

        }
    }
    return (
        <div style={{ height: "100%" }}  >
            <Slidebar />
            <div style={{ height: "100%" }} >
                <div style={{ height: "100%" }} class="p-2 sm:ml-64">
                    <div style={styles.imageabc} class="p-4  border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                            <ol class="list-none p-0 inline-flex">
                                <li class="flex items-center text-white">
                                    <a href="#" class="text-white">Home</a>
                                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li class="flex items-center">
                                    <a href="#" class="text-white">Dashboard</a>
                                </li>
                            </ol>
                        </nav>
                        <div class="lg:flex justify-between items-center mb-6">
                            <p class="text-2xl text-white font-semibold mb-2 lg:mb-0">Hey!!  {userdata.username}</p>
                            {/* <button class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">View Logs</button> */}
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-20">

                            <div class="w-1/2 xl:w-1/4 px-3">
                                <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">

                                    <div class="text-gray-700">
                                        <p class="font-semibold text-3xl">{studentdata.length}</p>
                                        <p>Total Student</p>
                                    </div>

                                </div>
                            </div>

                            <div class="w-1/2 xl:w-1/4 px-3">
                                <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">

                                    <div class="text-gray-700">
                                        <p class="font-semibold text-3xl">{roomdata.length}</p>
                                        <p>Total Room</p>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2 xl:w-1/4 px-3">
                                <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">


                                    <div class="text-gray-700">
                                        <p class="font-semibold text-3xl">{count}</p>
                                        <p>Available Space</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHomepage