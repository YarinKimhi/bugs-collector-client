import React , {useState,useEffect} from 'react';
import '../bug.css'


const Bug = ({nameCreator, headline ,description,team,severity}) =>{
    const [fromData , setFromData] = useState({
        nameCreator, headline ,description,team,severity
    })
    
    
    console.log(nameCreator, headline ,description,team)

    return(
        <>
    <div className="bug">      
    <div class="card-deck mb-3 text-center">
        <div class="card mb-4 shadow-sm">
            <div class="card-header">
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
}
export default Bug;

