import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import {getCookie ,signout,isAuth} from '../../shared/auth'
import Navbar from '../components/navbar.component'
import SideNavbar from '../components/sidenavbar.component';
import Chart from '../components/chart.component'


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

    const styles = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
      };

    return(
        <div style={{backgroundColor: "rgb(230,230,230)"}}>
        {isAuth() ? <Redirect to='/dash/stats' /> : <Redirect to='/' />}
        
        <Navbar signout={signout}/>
            <div>
                <SideNavbar/>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="h2">Stats</h2>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        </div>
                    </div>
                    <ToastContainer />
                    <div style={styles}>
                        <Chart data ={data} />
                    </div>
                </main>    
            </div>    
        </div>
        
    );
}
export default Stats;



