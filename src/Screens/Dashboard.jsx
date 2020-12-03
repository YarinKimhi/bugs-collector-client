import React , {useState,useEffect} from 'react';
import {ToastContainer } from 'react-toastify';
import axios from 'axios';
//import {Redirect} from 'react-router-dom';
import '../bug.css'
import '../dashboard.css'
import Bugs from '../components/Bugs.jsx';



const Dashboard = ({match,history}) =>{
    const [bugs , setBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:'',
        status:''
    }]
    )
    const [tokenData, setToken] = useState({
        token:''
    })
    const [searchData, setSearchData] = useState({ 
        search:'',
        searchFlag: false
    })
    
    useEffect (() =>{
        let token = match.params.token
        if(token){
            setToken({token})
        }
        axios.get(`${process.env.REACT_APP_API_URL}/dash/`
        ).then(res => {
            setBugs(res.data.bugs)
            }).catch((err)=> {
                console.log(err)
            }) 
    },[])
    
    const handleChange = e => {
       let searchValue = e.target.value
       let flag =  searchValue ? true : false
       setSearchData({search : searchValue , searchFlag: flag})
    }
    const handleSubmit = (e) =>{
        
    }
    const {searchFlag,search} = searchData
    const {token} = tokenData

    return(       
        <div className=''>
             <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">Bug Controller</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" 
                    data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search user or bug headline" aria-label="Search" onChange={handleChange} ></input>
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
                        <a class="nav-link active" href= {`/dash/${token}`}>
                        <span data-feather="home"></span>
                            Dashboard <span class="sr-only">(current)</span> 
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href= {`/dash/bugreport/${token}`} >
                        <span data-feather="home"></span>
                            Report new bug <span class="sr-only"></span>  
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/">
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
            <Bugs bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="To Do" />
            <Bugs bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="In Progress" />
            <Bugs bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="Under Review" /> 
            <Bugs bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="Done" /> 
        </div> 
        </div>
    );
  };
export default Dashboard;