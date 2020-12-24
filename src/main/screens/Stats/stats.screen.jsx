import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {getCookie ,signout,isAuth} from '../../../shared/auth'
import Navbar from '../../components/Navbar/navbar.component'
import SideNavbar from '../../components/SideNavBar/sidenavbar.component';
import Chart from '../../components/Chart/chart.component'


const Stats = ()=>{
    const [data , setData] = useState([{
       date:'',       
       counter:''    // count how many bugs reported each day.
    }])
    const [periodText , setPeriodText ] = useState("Last 30 days")

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const finish = new Date (today)
    
    useEffect (() =>{
        let token = getCookie('token')
        if(!token){
            window.location.replace("/");
        }else{
            today.setDate(today.getDate() - 30);
            const start =  new Date (today)
            axios.post(`${process.env.REACT_APP_API_URL}/dash/bugs/stats`,{
                start,finish
            }
            ).then(res => {
                const response = res.data.result.map(item =>{
                    return { date: new Date (item._id.year, item._id.month -1, item._id.day ) , counter: item.count}
                })
                setData(response);
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    },[])

    const styles = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
      };

    
    const handleClick = (e)=>{
        if(e.target.value){
            let period = e.target.value;
            let periodText = (period === "30") ? "Last 30 days"  :
                         (period === "90") ? "Last 3 months" : 
                         (period === "180")? "Last 6 months" :
                         (period === "365")? "Last year" : "";           
            setPeriodText(periodText)
            today.setDate(today.getDate() - period);
            const start =  new Date (today)
            axios.post(`${process.env.REACT_APP_API_URL}/dash/bugs/stats`,{
                start,finish
            }
            ).then(res => {
                const response = res.data.result.map(item =>{
                    return { date: new Date (item._id.year, item._id.month -1, item._id.day ) , counter: item.count}
                })
                setData(response);
                
            }).catch((err)=> {
                console.log(err)
            })
        }  
    }
    
    
    return(
        <div style={{backgroundColor: "rgb(230,230,230)"}} >
            {isAuth() ? <Redirect to='/dash/stats' /> : <Redirect to='/' />}
            <Navbar signout={signout}/>
            <div>
                <SideNavbar/>
                <main  role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="h2">Stats</h2>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" role="button"  
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/" >
                                    {periodText}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                    <option className="dropdown-item" value ={30} onClick={handleClick} >Last 30 days</option>
                                    <option className="dropdown-item" value ={90} onClick={handleClick} >Last 3 months</option>
                                    <option className="dropdown-item" value ={180} onClick={handleClick} >Last 6 months</option>
                                    <option className="dropdown-item" value ={365} onClick={handleClick} >Last year</option>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div style={styles}>
                        <Chart data ={data} />
                    </div>
                </main>    
            </div> 
        </div>
        
    );
}
export default Stats;



