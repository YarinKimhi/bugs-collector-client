import React , {useState,useEffect} from 'react';
import '../bug.css'
import BugCard from './BugCard.jsx';
import BugCardsSearch from './BugCardsSearch';


const BugsCards = ({bugs ,searchFlag ,searchValue ,status,handleClick, user}) =>{
    if(user){
        return(
            <>
                <h4> {(bugs)? "Assigned to you:" : null} </h4>
                <div className="scrolling-wrapper">
                {bugs.map(bug => ( !searchFlag  && bug.assign === user) ?
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
                        /> : (searchFlag && bug.assign === user )?
                        <BugCardsSearch 
                            key={bug._id} 
                            id={bug._id}
                            nameCreator={bug.nameCreator}
                            headline={bug.headline} 
                            description={bug.description}    
                            team ={bug.team}
                            severity={bug.severity}
                            status = {bug.status}
                            assign={bug.assign}
                            search = {searchValue}
                            handleClick={handleClick}
                        />: []
                    )}
                </div> 
            </>
        );
    }else{
        return(
            <>
            <h4> {(bugs)? status : null} </h4>
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
                            assign={bug.assign}
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
                            assign={bug.assign}
                            search = {searchValue}
                            handleClick={handleClick}
                        />: []
                    )}
                </div> 
            </>
        );
    }
    
}
export default BugsCards;

