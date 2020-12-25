import './user.css'
const User = ({user,handleChange,handleSubmit})=>{
    return(
        <div className="user-box ">
            <form className="row" onSubmit={handleSubmit} >
                <div className="col-md-6">
                    <div className="form-group">
                        <label >Full Name</label>
                        <input className="form-control" type="text" value={user.name} onChange={handleChange('name')} required=""/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label >E-mail Address</label>
                        <input className="form-control" type="email"  value={user.email} onChange={handleChange('email')} disabled=""/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label >New Password</label>
                        <input className="form-control" onChange={handleChange('password')}  type="password" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label >Confirm Password</label>
                        <input className="form-control" onChange={handleChange('confirmpassword')} type="password" />
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-style-2 btn-primary" type="submit" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Update Profile</button>
                </div>
            </form>
        </div>                    
    );
}
export default User;




/*

*/