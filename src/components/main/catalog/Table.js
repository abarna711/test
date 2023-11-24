import React from "react";
import PropTypes from "prop-types";
import "./Categories.css";

function Table({ tableData, handleDelete }) {
  if (tableData && Array.isArray(tableData.categories)) {
    const categories = tableData.categories;

    

    return (
      <table className="table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.category}</td>
              <td>{data.subcategory}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(index)} // Pass the index to the handler
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } 
}

Table.propTypes = {
  tableData: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Table;
