import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import {getCookie ,removeCookie,removeLocalStorage,signout,isAuth} from '../../shared/auth'
import Navbar from '../components/navbar.component'
import SideNavbar from '../components/sidenavbar.component';


const Stats = ()=>{
    const [data , setData] = useState([{
       date:'',       // object of date
       counter:''    // count how many bus reported each day.
    }])

    const [dates, setDates] = useState({
        start: new Date("2020-01-30"),
        finish: new Date("2020-12-30")
    })
    /*useEffect (() =>{
        let token = getCookie('token')
        if(!token){
            window.location.replace("/");
        }else{
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);

            const finish = new Date (today)
            today.setDate(today.getDate() - 30);
            const start =  new Date (today)

            setDates({start,finish})
        }
    },[]);
    */
    
    useEffect (() =>{
        let token = getCookie('token')
        if(!token){
            window.location.replace("/");
        }else{
            axios.post(`${process.env.REACT_APP_API_URL}/dash//bugs/getdata`,{
                dates
            }
            ).then(res => {
                const response = res.data.result.map(item =>{
                    return { date: new Date (item._id.year, item._id.month -1, item._id.day ) , counter: item.count}
                })
                setData( response);
            }).catch((err)=> {
                console.log(err)
            })
        }
    },[])

    console.log(data)
    return(
        <div>
            {isAuth() ? <Redirect to='/dash/stats' /> : <Redirect to='/' />}
            

        </div>
        
    );
}
export default Stats;



