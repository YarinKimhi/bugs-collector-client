import React , {useState,useEffect} from 'react';
import '../bug.css'
import BugCard from './BugCard.jsx';
import BugCardsSearch from './BugCardsSearch';


const BugsCards = ({bugs ,searchFlag ,searchValue ,status,handleClick}) =>{
    const [fromData , setFromData] = useState({
        
    })
    return(
        <>
        <h4> {status} </h4>
            <div className="scrolling-wrapper">
            {bugs.map(bug => (bug.status===status && !searchFlag ) ?
                    <BugCard 
                        key={bug._id} 
                        id={bug._id}
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                        status = {bug.status}
                        handleClick={handleClick}
                    /> : (bug.status=== status && searchFlag )?
                    <BugCardsSearch 
                        key={bug._id} 
                        id={bug._id}
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                        status = {bug.status}
                        search = {searchValue}
                        handleClick={handleClick}
                    />: []
                )}
            </div> 
        </>
    );
}
export default BugsCards;