import React, { useState, useEffect } from "react";
import Table from "./Table";

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
      setData([...data, newData]); 
      setFormInputData({ category: "", subcategory: "" });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      if (!data || !data[index] || !data[index]._id) {
        console.error("Data or ID not available for deletion");
        return;
      }
  
      await fetch(`http://localhost:3001/api/categories/${data[index]._id}`, {
        method: "DELETE",
      });
  
      const newData = data.filter((_, i) => i !== index);
      setData(newData); 
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  
  

  return (
    <div className="categories">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="form-row row">
              <div className="col">
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.category}
                  name="category"
                  className="form-control"
                  placeholder="Category"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.subcategory}
                  name="subcategory"
                  className="form-control"
                  placeholder="Subcategory"
                />
              </div>
              <div className="col">
                <input type="submit" onClick={handleSubmit} className="btn btn-primary" />
              </div>
            </div>
            <Table tableData={data} handleDelete={handleDelete} />
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
