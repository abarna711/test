import React, { useState, useEffect } from "react";
import Table from "./Table";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import './Categories.css';
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillDelete } from "react-icons/ai";


function Categories() {
  const [data, setData] = useState([]);
  const [formInputData, setFormInputData] = useState({
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    const handleChange = (evnt) => {
    const newInput = { ...formInputData, [evnt.target.name]: evnt.target.value };
    setFormInputData(newInput);
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData),
      });
      const newData = await response.json(); 
      console.log(newData);
     fetchData()
      setFormInputData({ category: "", subcategory: "" });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
 
  

  return (
    <div className="categories">
      <div className="container-fulid">
        <div className="header">
            <div className="row">
              <div className="col-lg-2 ps-4">
                <h2>Categories</h2>
              </div>
              <div className="col-lg-1 hometext pt-2">
                <Link to="/admin" style={{color:"gray",fontSize:"20px",textDecoration:"none"}}>Home<IoIosArrowForward/></Link>
              </div>
              <div className="col-lg-1 text2 pt-2">
                <Link to="/admin"style={{color:"blue",fontSize:"20px",textDecoration:"none"}}>Categories</Link>
              </div>
              <div className="col-lg-6"></div>
              
            </div>
          </div>
          <hr style={{borderBottomColor:"black"}}></hr>
        <div className="row">
            <div className="form card pt-5 pb-5 mt-3" style={{width:"80%"}}>
              <div >
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.category}
                  name="category"
                  className="form-control"
                  placeholder="Category"
                />
              </div><br/>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.subcategory}
                  name="subcategory"
                  className="form-control"
                  placeholder="Subcategory"
                />
              </div><br/>
              <div >
                <button type="submit" onClick={handleSubmit} className="btn btn-primary pt-2 pb-2" >Submit</button>
              </div>
            </div>
           </div>
           <div className="row">
           <div className="main-table card" style={{width:"80%"}}>
            <div className="row table-text">
              <div className="col col-lg-3 pt-2"><h3><TfiMenuAlt className="icon pe-2 pb-1"/>CATEGORIES</h3></div>
              <div className="col col-lg-8"></div>
              <div className="col col-lg-1 mt-2"><AiFillDelete/></div>
            </div>
            <div className="tabledata">
             <Table tableData={data}/>
            </div>
            </div>
          </div>  
          </div>
        </div>
  );
}

export default Categories;
