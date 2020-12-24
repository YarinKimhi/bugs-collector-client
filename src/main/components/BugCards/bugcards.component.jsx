import React from 'react';
import BugCard from '../BugCard/bugcard.component';



const BugsCards = ({bugs ,searchFlag ,searchValue ,status,handleClick, user}) =>{
    if(user){
        return(
             <div>
                {bugs.map(bug => ( bug.assign === user) ?
                    <BugCard 
                        key={bug._id} 
                        id={bug._id}
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                        status = {bug.status}
                        assign={bug.assign}
                        handleClick={handleClick}
                        searchFlag={searchFlag}
                        search={searchValue}
                    /> : []
                )}
            </div> 
        );
    }else{
        return(
            <div>
            {bugs.map(bug => (bug.status===status ) ?
                    <BugCard 
                        key={bug._id} 
                        id={bug._id}
                        nameCreator={bug.nameCreator}
                        headline={bug.headline} 
                        description={bug.description}    
                        team ={bug.team}
                        severity={bug.severity}
                        status = {bug.status}
                        assign={bug.assign}
                        handleClick={handleClick}
                        searchFlag={searchFlag}
                        search={searchValue}
                /> : []
                )}
            </div> 
            
        );
    }
    
}
export default BugsCards;

