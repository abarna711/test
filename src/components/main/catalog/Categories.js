// frontend/Categories.js

import React, { useState } from "react";
import Table from "./Table";

function Categories() {
  const [tableData, setTableData] = useState([]);
  const [formInputData, setFormInputData] = useState({
    category: "",
    subcategory: "",
  });

  const handleChange = (evnt) => {
    const newInput = { ...formInputData, [evnt.target.name]: evnt.target.value };
    setFormInputData(newInput);
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    const checkEmptyInput = !Object.values(formInputData).every((res) => res === "");
    if (checkEmptyInput) {
      try {
        const response = await fetch('http://localhost:3001/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formInputData),
        });
        if (response.ok) {
          const newData = [...tableData, formInputData];
          setTableData(newData);
          const emptyInput = { category: "", subcategory: "" };
          setFormInputData(emptyInput);
        } else {
          console.error('Failed to add category');
        }
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <div className="categories">
      <div className="container d-block">
        <div className="card" style={{ width: "70%", height: "230px" }}>
          <div className="form ps-5 ms-5">
            <input
              type="text"
              onChange={handleChange}
              value={formInputData.category}
              name="category"
              className="form-control mt-4 ms-5"
              placeholder="Category"
              style={{ width: "60%" }}
            />
            <input
              type="text"
              onChange={handleChange}
              value={formInputData.subcategory}
              name="subcategory"
              className="form-control mt-4 ms-5"
              style={{ width: "60%" }}
              placeholder="Subcategory"
            />
            <input
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary ms-5 mt-4"
            />
          </div>
        </div>
        <div className="pt-3 card" style={{ width: "70%", border: "none" }}>
          <Table tableData={tableData} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
