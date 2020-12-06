import React , {useState,useEffect} from 'react';
import '../bug.css'


const BugCardsSearch = ({nameCreator, headline ,description,team,severity,status,search}) =>{
    const [fromData , setFromData] = useState({
        nameCreator, headline ,description,team,severity ,status
    })
    const headlineBackColor =
        (severity === 'High') ? "tomato" : 
        (severity === 'Medium') ? "lemonchiffon" : 
        (severity === 'Low') ? "palegreen" : "white"
    
    if( nameCreator.toLowerCase().startsWith(search.toLowerCase()) || headline.toLowerCase().startsWith(search.toLowerCase()) ) {  
        return(
            <>
            <div className="bug">      
            <div class="card-deck mb-3 text-center">
                <div class="card mb-4 shadow-sm">
                    <div class="card-header" style = {{backgroundColor: headlineBackColor,overflow:"auto"}}>
                        <h4 class="my-0 font-weight-normal">{headline} - <small class="text-muted">{nameCreator}</small> </h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mt-3 mb-4">
                        <li>{description}</li>
                        <li>{team}</li>
                        </ul>
                    </div>    
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary">...</button>
            </div>
            </div>
            </div> 
            </>
             
        );
    }else{
        return (
        <>
        </>
        )
    }
}
export default BugCardsSearch;

