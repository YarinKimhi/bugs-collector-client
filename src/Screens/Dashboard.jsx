import React , {useState,useEffect} from 'react';
import axios from 'axios';
//import {Redirect} from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import '../bug.css'
import '../dashboard.css'
import BugsCards from '../components/BugsCards.jsx';
import BugModel from '../components/BugModel'
import {getCookie ,removeCookie,removeLocalStorage} from '../helpers/auth'



const Dashboard = ({history}) =>{
    const [bugs , setBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:'',
        status:''
    }]
    )
    
    const [searchData, setSearchData] = useState({ 
        search:'',
        searchFlag: false
    })
    
    const [currentBug , setCurrentBug] = useState({
        _id:'',
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:'',
        status:''
    })

    useEffect (() =>{
        let token = getCookie('token')
        let user= JSON.parse(localStorage.getItem("user"))
        if(!token){
            history.push(`/`)
        }else{
            axios.get(`${process.env.REACT_APP_API_URL}/dash/`
            ).then(res => {
                setBugs(res.data.bugs)
                }).catch((err)=> {
                    console.log(err)
                })
        }
    },[history])
    
    const handleChange = e => {
       let searchValue = e.target.value
       let flag =  searchValue ? true : false
       setSearchData({search : searchValue , searchFlag: flag})
    }

    const handleClick =  (e) =>{
        let id = e.id
        if (id){
             axios.post(`${process.env.REACT_APP_API_URL}/dash/bug/`,{
                id
            }).then(res=>{
                setCurrentBug(res.data.bug)
            }).catch((err)=>{
                console.log(err)
            });

           let modal = document.getElementById("myModal");
           if(modal !== "none"){
                let span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onClick = ()=> { //close functionaity
                    modal.style.display = "none";
                }
                window.onclick = (event)=> { //close functionaity
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
           }else{
               toast.error("Something went wrong")
           }
        }
    }
    const signout = ()=> {
        removeCookie("token")
        removeLocalStorage("user")
        history.push(`/`)
    }

    const {searchFlag,search} = searchData

    return(       
        <div className=''>
             <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">Bug Controller</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" 
                    data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search user or bug headline" 
                aria-label="Search" onChange={handleChange} ></input>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="/" onClick={signout} >Sign out</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid">
                <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="sidebar-sticky pt-3">
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href= {`/dash/`}>
                            <span data-feather="home"></span>
                                Dashboard <span className="sr-only">(current)</span> 
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href= {`/dash/bugreport/`} >
                            <span data-feather="home"></span>
                                Report new bug <span className="sr-only"></span>  
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                            <span data-feather="home"></span>
                                Stats <span className="sr-only"></span>  
                            </a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Dashboard</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>
            <ToastContainer />
            <BugsCards bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="To Do" handleClick= {handleClick}/>
            <BugsCards bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="In Progress" handleClick= {handleClick}/>
            <BugsCards bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="Under Review" handleClick= {handleClick} /> 
            <BugsCards bugs ={bugs} searchFlag={searchFlag} searchValue ={search} status ="Done"  handleClick= {handleClick}/> 
            <div id="myModal" className="modal" >
                <BugModel key={currentBug._id} currentBug= {currentBug}  /> 
            </div>
            </main>
            </div> 
        </div>
    );
  };
export default Dashboard;
