import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillDelete } from "react-icons/ai";
import "./Categories.css";
import axios from "axios";

function Categories() {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

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
    const responseData = await response.json();

    if (responseData && responseData.categories && responseData.categories.length > 0) {
      const sortedCategories = responseData.categories.sort((a, b) => b._id.localeCompare(a._id));

      setData({ categories: sortedCategories });
    } else {
      setData({ categories: [] });
    }
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
      fetchData();
      setFormInputData({ category: "", subcategory: "" });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };



  useEffect(() => {
    if (selectAllChecked) {
      const allCategoryIds = data.categories.map((category) => category._id);
      setSelectedCategories(allCategoryIds);
    } else {
      setSelectedCategories([]);
    }
  }, [selectAllChecked, data]);
  

  
  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the selected categories?")) {
      try {
        await axios.delete("http://localhost:3001/delete/categories", { data: { ids: selectedCategories } });
  
        fetchData();
        setSelectedCategories([]);
        setSelectAllChecked(false);
      } catch (error) {
        console.error("Error deleting categories:", error.message);
      }
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
                <Link to="/admin" style={{color:"gray",fontSize:"20px",textDecoration:"none"}}> Home <IoIosArrowForward/></Link>
              </div>
              <div className="col-lg-1 text2 pt-2">
                <Link to="/admin"style={{color:"blue",fontSize:"20px",textDecoration:"none"}}> Categories </Link>
              </div>
              <div className="col-lg-6"></div>
              
            </div>
          </div>
          <hr style={{borderBottomColor:"black"}}></hr>
        <div className="row">
          {/* Form Section */}
          <div className="form card pt-5 pb-5 mt-3" style={{ width: "80%" }}>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.category}
                  name="category"
                  className="form-control"
                  placeholder="Category"
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.subcategory}
                  name="subcategory"
                  className="form-control"
                  placeholder="Subcategory"
                />
              </div>
              <br />
              <div>
                <button type="submit" className="btn btn-primary pt-2 pb-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* Table Section */}
          <div className="main-table card pt-3 pb-3 mt-3 " style={{ width: "80%" }}>
            <div className="row table-text">
              <div className="col col-lg-3 pt-2">
                <h3>
                  <TfiMenuAlt className="icon pe-2 pb-1" />CATEGORIES
                </h3>
              </div>
              <div className="col col-lg-8"></div>
              <div className="col col-lg-1 mt-2" onClick={handleDelete}>
                <AiFillDelete />
              </div>
            </div>
            <div className="tabledata">
              {data && data.categories && data.categories.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                         <input type="checkbox"   checked={selectAllChecked}
                      onChange={handleSelectAllChange}/>
                      </th>
                      <th>S.N</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.categories.map((data, index) => (
                      <tr key={data._id} style={{ backgroundColor: index % 2 === 0 ? 'gray' : 'white' }}>
                        <td>
                          <input
                           type="checkbox"
                            checked={selectedCategories.includes(data._id)}
                      onChange={() => handleCheckboxChange(data._id)}
                           />
                        </td>
                        <td>{index + 1}</td>
                        <td>{data.category}</td>
                        <td>{data.subcategory}</td>
                        <td>
                          <button className="btn btn-sm">
                           <Link to='/admin/catalog/categories/edit'>Edit</Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
