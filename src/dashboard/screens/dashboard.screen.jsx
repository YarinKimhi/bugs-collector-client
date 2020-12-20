import React , {useState,useEffect} from 'react';
import axios from 'axios';
//import {Redirect} from 'react-router-dom';
import {ToastContainer , toast} from 'react-toastify';
import '../bug.css'
import '../dashboard.css'
import BugsCards from '../components/bugcards.component'
import BugModal from '../modals/bug.modal'
import {getCookie ,removeCookie,removeLocalStorage} from '../../shared/auth'
import * as Icon from 'react-feather';

const Dashboard = ({history}) =>{
    
    const [bugs , setBugs] = useState([{
        nameCreator: '',
        headline: '',
        description:'',
        team: '',
        severity:'',
        status:'',
        assign:''
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
        status:'',
        assign:''
    })
    const [user,setUser]=useState({
        name:''
    })

    useEffect (() =>{
        let token = getCookie('token')
        if(!token){
            window.location.replace("/");
        }else{
            const user = JSON.parse(localStorage.getItem('user'))
            setUser(user)
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
                modal.style.display = "block";
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
        window.location.replace("/");
    }

    const {searchFlag,search} = searchData
    //const user = JSON.parse(localStorage.getItem('user'))

    return(       
        <div style={{backgroundColor: "rgb(230,230,230)"}}>
             <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 " style={{backgroundColor: "rgb(40,40,40)"}} href="/">Bug Controller</a>
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
            <div>
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="sidebar-sticky" style={{backgroundImage:"linear-gradient(#3AA655, #6CA67C)"}}>
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href= {`/dash/`} > 
                            <p class="p1" > <Icon.Home size={16} style={{display: "inline", verticalAlign:"text-bottom"}}/> Dashboard </p>
                            <span className="sr-only">(current)</span> 
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href= {`/dash/bugreport/`} >
                            <p className="p1" > <Icon.File size={16} style={{display: "inline", verticalAlign:"text-bottom"}}/> Report new Bug </p>
                            <span className="sr-only"></span>  
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                            <p className="p1" > <Icon.User size={16} style={{display: "inline", verticalAlign:"text-bottom"}}/> Profile </p>
                            <span className="sr-only"></span>  
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                            <p className="p1" > <Icon.BarChart2 size={16} style={{display: "inline", verticalAlign:"text-bottom"}}/> Stats </p>
                            <span className="sr-only"></span>  
                            </a>
                        </li>
                        </ul>
                    </div>
                </nav>
                
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="h2">Dashboard</h2>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        </div>
                    </div>
                    <ToastContainer />
                    <BugsCards
                        bugs ={bugs} 
                        searchFlag={searchFlag}
                        searchValue ={search}
                        user={user.name}
                        handleClick= {handleClick}
                    />
                    <BugsCards 
                        bugs ={bugs} 
                        searchFlag={searchFlag} 
                        searchValue ={search} 
                        status ="New" 
                        handleClick= {handleClick}
                    />
                    <BugsCards 
                        bugs ={bugs} 
                        searchFlag={searchFlag} 
                        searchValue ={search} 
                        status ="In Progress" 
                        handleClick= {handleClick}
                    />
                    <BugsCards 
                        bugs ={bugs} 
                        searchFlag={searchFlag} 
                        searchValue ={search} 
                        status ="Under Review" 
                        handleClick= {handleClick}
                    /> 
                    <BugsCards 
                        bugs ={bugs}
                        searchFlag={searchFlag} 
                        searchValue ={search} 
                        status ="Fixed"  
                        handleClick= {handleClick}
                    /> 
                    <div id="myModal" className="modal" >
                        <BugModal 
                            key={currentBug._id}
                            setBugs={setBugs}   
                            currentBug= {currentBug}
                            setCurrentBug={setCurrentBug} 
                        /> 
                    </div>
                </main>
            </div> 
        </div>
    );
  };
export default Dashboard;
