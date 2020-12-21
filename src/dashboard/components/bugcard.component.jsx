import React from 'react';
import '../bug.css'


const BugCard = ({id,nameCreator, headline ,description,team,severity,status,assign,search,searchFlag,handleClick}) =>{
    const headlineBackColor = "white"  
    if (searchFlag){
        if( nameCreator.toLowerCase().startsWith(search.toLowerCase()) || headline.toLowerCase().startsWith(search.toLowerCase()) ) {  
            return(
                <>
                <div className="bug">      
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header" style = {{backgroundColor: headlineBackColor ,overflow:"auto"}}>
                                <h4 className="my-0 font-weight-normal">{headline} - <small className="text-muted">{nameCreator}</small> </h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mt-3 mb-4">
                                <li>{description}</li>
                                <li>{team}</li>
                                </ul>
                            </div>    
                            <button type="button" className="btn btn-lg btn-block btn-outline-primary"  onClick={()=>handleClick({id})} >...</button>
                        </div>
                    </div>
                </div> 
                </>
            );
        }else{
            return (
                <>
                </>
            );
        }
    }else{
        return(
            <>
            <div className="bug">      
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header" style = {{backgroundColor: headlineBackColor ,overflow:"auto"}}>
                            <h4 className="my-0 font-weight-normal">{headline} - <small className="text-muted">{nameCreator}</small> </h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled mt-3 mb-4">
                            <li>{description}</li>
                            <li>{team}</li>
                            </ul>
                        </div>    
                        <button type="button" className="btn btn-lg btn-block btn-outline-primary"  onClick={()=>handleClick({id})} >...</button>
                    </div>
                </div>
            </div> 
            </>
        );
    }
}
export default BugCard;


// 