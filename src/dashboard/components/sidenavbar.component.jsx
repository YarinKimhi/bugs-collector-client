import * as Icon from 'react-feather';

const SideNavbar = () =>{
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="sidebar-sticky" style={{backgroundImage:"linear-gradient(#3AA655, #6CA67C)"}}>
                        <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href= {`/dash/`} > 
                            <p className="p1" > <Icon.Home size={16} style={{display: "inline", verticalAlign:"text-bottom"}}/> Dashboard </p>
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
    );
}
export default SideNavbar;