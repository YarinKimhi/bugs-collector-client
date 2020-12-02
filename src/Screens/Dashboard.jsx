import React , {useState,useEffect} from 'react';
import {ToastContainer } from 'react-toastify';
import axios from 'axios';
//import {Redirect} from 'react-router-dom';
import '../bug.css'
import '../dashboard.css'
import Bug from '../components/Bug.jsx'



const Dashboard = ({match}) =>{
    const [bugs , setBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:''
    }]
    )
    const [lowPrBugs , setlowPrBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:''
    }]
    )
    const [midPrBugs , setmidPrBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:''
    }]
    )
    const [highPrBugs , sethighPrBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:''
    }]
    )
    
    useEffect (() =>{
        let token = match.params.token
        axios.get(`${process.env.REACT_APP_API_URL}/dash/`
        ).then(res => {
            setBugs(res.data.bugs)
            }).catch((err)=> {
                console.log(err)
            }) 
    },[])
    
    const handleChange = (text) => e => {
       
    }

    return(       
        <div className=''>
             <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Bug Controller</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"></input>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <a class="nav-link" href="/">Sign out</a>
                    </li>
                </ul>
            </nav>
            <div class="container-fluid">
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="sidebar-sticky pt-3">
                    <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                        <span data-feather="home"></span>
                            Dashboard <span class="sr-only">(current)</span>
                            
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                        <span data-feather="home"></span>
                            Stats <span class="sr-only"></span>
                            
                        </a>
                    </li>
                    </ul>
                </div>
                </nav>
        </div>
        </div>
        <div className='absolute'>
            <ToastContainer />
            <h4>High priority:</h4>
            <div className="scrolling-wrapper">
                {bugs.map(bug => (bug.severity==='High')?
                    <Bug 
                        key={bug._id} 
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                    /> : []
                )} 
            </div>
            <h4>Mid priority:</h4>
            <div className="scrolling-wrapper">
                {bugs.map(bug => (bug.severity==='Medium')?
                    <Bug 
                        key={bug._id} 
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                    /> : []
                )} 
            </div>
            <h4>Low priority:</h4>
            <div className="scrolling-wrapper">
                {bugs.map(bug => (bug.severity==='Low')?
                    <Bug 
                        key={bug._id} 
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                    /> : []
                )} 
            </div>
        </div> 
        </div>
    );
  };
export default Dashboard;
// <Bug />


