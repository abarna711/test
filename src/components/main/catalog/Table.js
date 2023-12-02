import React from "react";
import PropTypes from "prop-types";
import "./Categories.css";

function Table({ tableData }) {
  const [selectedRows, setSelectedRows] = useState([]);

  //   const handleCheckboxChange = (index) => {
  //   const selectedIndex = selectedRows.indexOf(index);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selectedRows, index);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selectedRows.slice(1));
  //   } else if (selectedIndex === selectedRows.length - 1) {
  //     newSelected = newSelected.concat(selectedRows.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selectedRows.slice(0, selectedIndex),
  //       selectedRows.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedRows(newSelected);

  // };

  // const handleCheckboxChange = (event, index) => {
  //   if (event.target.checked) {
  //     setSelectedRows([...selectedRows, index]);
  //   } else {
  //     setSelectedRows(selectedRows.filter((row) => row !== index));
  //   }
  // };

  const handleRowSelection = (categoryId, category) => {
    if (selectedRows.includes(categoryId)) {
      setSelectedRows(selectedRows.filter((id) => id !== categoryId));
    } else {
      setSelectedRows([...selectedRows, categoryId]);
    }
    const newData = data.map((index) => {
      if (index === categoryId) {
        return { ...index, category };
      }
      return index;
    });
    setData(newData);
  };

  if (tableData && Array.isArray(tableData.categories)) {
    const categories = tableData.categories.sort((a, b) => b._id.localeCompare(a._id));

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>S.N</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(data.id)}
                  onChange={() => handleRowSelection(data.id, data.category)}
                />
              </td>
                <td>{index + 1}</td>
                <td>{data.category}</td>
                <td>{data.subcategory}</td>
                <td>
                  <button className="btn btn-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
  return null;
}

Table.propTypes = {
  tableData: PropTypes.object.isRequired,
  // selectedRows: PropTypes.array.isRequired,
  // handleRowSelect: PropTypes.func.isRequired,
};

export default Table;
