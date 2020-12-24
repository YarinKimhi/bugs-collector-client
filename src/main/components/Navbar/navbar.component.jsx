import SearchBar from '../SearchBar/searchbar.component'
 
const Navbar = ({signout,handleChange, searchbar})=>{
    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 " style={{backgroundColor: "rgb(40,40,40)"}} href="/">Bugs Controller</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" 
                    data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <SearchBar handleChange={handleChange} flagSearchBar={searchbar}/>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="/" onClick={signout} >Sign out</a>
                    </li>
                </ul>
            </nav>
    );
}
export default Navbar;