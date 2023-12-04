import { React, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";



function Editcategory() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="add">
      <div className="home3">
        <div className="header">
        <div className="row">
              <div className="col-lg-2 ps-4">
                <h2>Catagories</h2>
              </div>
              <div className="col-lg-1 hometext pt-2">
                <Link to="/admin/catalog/categories" style={{color:"gray",fontSize:"20px",textDecoration:"none"}}>Home<IoIosArrowForward /></Link>
              </div>
              <div className="col-lg-1 text2 pt-2">
                <Link to="/admin/catalog/categories"style={{color:"blue",fontSize:"20px",textDecoration:"none"}}>Categories</Link>
              </div>
              <div className="col-lg-6"></div>
              <div className="col-lg-2 ps-2 goback">
                <Link to="/admin/catalog/categories" style={{textDecoration: 'none'}}   title="Go Back"> <RiArrowGoBackFill style={{backgroundColor:'blue'}} className="icon ps-1 pe-1 " /></Link>
              
              </div>
              <hr></hr>
            </div>
           
        </div>
        </div>
        
      
    

      <div className="container ">
        <div className="card" style={{ width: "70%", height: "300px" }}>
          <div className="form ps-5 ms-5">
            <form
              action=""
              method="POST"
              encType="multipart/form-data"
              style={{ width: "100%" }}
            >
              <input
                type="text"
                name="category"
                className="form-control mt-4 ms-5"
                placeholder="Category"
                style={{ width: "60%", paddingLeft: "18px" }}
                required
              />
              <br />

              <input
                type="text"
              
                name="subcategory"
                className="form-control  mt-4 ms-5"
                style={{ width: "60%", paddingLeft: "18px" }}
                placeholder="Subcategory"
                required
              />

              <button
                type="button"
                className="btn btn-primary ms-5 mt-4"
              >
                Submit
              </button>
              <div>
              {error && (
                <div
                  className="alert alert-danger mt-2"
                  style={{ width: "60%", marginLeft: "6%",textAlign:'center' }}
                >
                  {error}
                </div>
              )}
              </div>
              <div>
              {success && 
              <div 
              className="alert alert-success mt-4" 
              style={{width:"60%",marginLeft:"6%",textAlign:'center'}}>
                Successfully Update!
                </div>}
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editcategory;