import React , {useState,useEffect} from 'react';
import '../bug.css'
import Bug from '../components/Bug.jsx';
import BugSearch from '../components/BugSearch';


const Bugs = ({bugs ,searchFlag ,searchValue ,status}) =>{
    const [fromData , setFromData] = useState({
        
    })
    return(
        <>
        <h4> {status} </h4>
        <div className="scrolling-wrapper">
        {bugs.map(bug => (bug.status===status && !searchFlag ) ?
                <Bug 
                    key={bug._id} 
                    nameCreator={bug.nameCreator}
                    headline={bug.headline} 
                    description={bug.description}    
                    team ={bug.team}
                    severity={bug.severity}
                    status = {bug.status}
                /> : (bug.status=== status && searchFlag )?
                <BugSearch 
                    key={bug._id} 
                    nameCreator={bug.nameCreator}
                    headline={bug.headline} 
                    description={bug.description}    
                    team ={bug.team}
                    severity={bug.severity}
                    status = {bug.status}
                    search = {searchValue}
                />: []
            )}
        </div> 
        </>
    );
}
export default Bugs;

