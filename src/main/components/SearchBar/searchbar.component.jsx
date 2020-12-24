
const SearchBar = ({flagSearchBar,handleChange}) =>{
    if(flagSearchBar){
        return(
            <input  
                className="form-control form-control-dark w-100"
                type="text" 
                placeholder="Search user or bug headline" 
                aria-label="Search" 
                onChange={handleChange} 
            />
        );
    }else{
        return (
            <>
            </>
        )
    }
}

export default SearchBar;