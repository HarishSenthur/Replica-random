import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import User from './User';
import './mainpage.css';

export const MainPage = () => {
    let [userData,setUserData] = useState([])
    useEffect(() => {
        axios.get("https://randomuser.me/api/?results=25")
        .then((data)=>{
            setUserData(data.data.results)
        })
    },[])

    let usersElements = userData.map((item)=>{
        return <User user={item} className = "user-total-container"/>
    })
  return (
    <div className='main-page-show-all-container'>{usersElements}</div>
  )
}

