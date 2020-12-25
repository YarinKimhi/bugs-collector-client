import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {ToastContainer , toast} from 'react-toastify';

import './dashboard.css'
import BugsCards from '../../components/BugCards/bugcards.component'
import BugModal from '../../modals/bug.modal'
import {getCookie ,signout} from '../../../shared/auth'
import Navbar from '../../components/Navbar/navbar.component'
import SideNavbar from '../../components/SideNavBar/sidenavbar.component';

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
    

    const {searchFlag,search} = searchData

    return(       
        <div style={{backgroundColor: "rgb(230,230,230)"}}>
            <Navbar handleChange={handleChange} signout={signout} searchbar = {true}/>
            <div>
                <SideNavbar/>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2 className="h2">Dashboard</h2>
                    </div>
                    <ToastContainer />
                    <div className="bugs-box">
                        <div className="title"> Assigned to you </div>
                            <BugsCards
                                bugs ={bugs} 
                                searchFlag={searchFlag}
                                searchValue ={search}
                                user={user.name}
                                handleClick= {handleClick}
                            />
                    </div>
                    <div className="bugs-box">
                        <div className="title"> New </div>
                            <BugsCards 
                                bugs ={bugs} 
                                searchFlag={searchFlag} 
                                searchValue ={search} 
                                status ="New" 
                                handleClick= {handleClick}
                            />
                    </div>
                    <div className="bugs-box">
                        <div className="title"> In Progress </div>
                            <BugsCards 
                                bugs ={bugs} 
                                searchFlag={searchFlag} 
                                searchValue ={search} 
                                status ="In Progress" 
                                handleClick= {handleClick}
                            />
                    </div>
                    <div className="bugs-box">
                        <div className="title"> Under Review </div>
                            <BugsCards 
                                bugs ={bugs} 
                                searchFlag={searchFlag} 
                                searchValue ={search} 
                                status ="Under Review" 
                                handleClick= {handleClick}
                            /> 
                    </div>
                    <div className="bugs-box">
                        <div className="title"> Fixed </div>
                            <BugsCards 
                                bugs ={bugs}
                                searchFlag={searchFlag} 
                                searchValue ={search} 
                                status ="Fixed"  
                                handleClick= {handleClick}
                            /> 
                    </div>
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
