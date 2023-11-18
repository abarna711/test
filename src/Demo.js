import React, { useState } from "react";
import Table from "./Table";

function Categories() {
  const [tableData, setTableData] = useState([]);
  const [formInputData, setFormInputData] = useState({
    category: "",
    subcategory: "",
    discription: "",
  });

  const handleChange = (evnt) => {
    const newInput = { ...formInputData, [evnt.target.name]: evnt.target.value };
    setFormInputData(newInput);
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    const checkEmptyInput = !Object.values(formInputData).every((res) => res === "");
    if (checkEmptyInput) {
      const newData = [...tableData, formInputData];
      setTableData(newData);
      const emptyInput = { category: "", subcategory: "", discription: "" };
      setFormInputData(emptyInput);
    }
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
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
                <input
                  type="text"
                  onChange={handleChange}
                  value={formInputData.discription}
                  name="discription"
                  className="form-control"
                  placeholder="Description"
                />
              </div>
              <div className="col">
                <input type="submit" onClick={handleSubmit} className="btn btn-primary" />
              </div>
            </div>
            <Table tableData={tableData} handleDelete={handleDelete} />
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Categories;




// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import "./Product.css"
// import { VscAdd } from "react-icons/vsc";
// import { MdEdit } from "react-icons/md";
// import { AiFillDelete } from "react-icons/ai";
// import { RxUpdate } from "react-icons/rx";
// import { Link } from "react-router-dom";
// import { IoIosArrowForward } from "react-icons/io";

// function Product() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     mainCategory: '',
//     subCategory: '',
//     productName: '',
//     price: 0,
//     offerPrice: 0,
//     quantity: 0,
//     image: '',
//   });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [sortedProducts, setSortedProducts] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);


//   useEffect(() => {
//     setSortedProducts([...products].sort((a, b) => b.id - a.id));
//   }, [products]);
//   const handleCreate = () => {
//     if (
//       newProduct.mainCategory &&
//       newProduct.subCategory &&
//       newProduct.productName &&
//       newProduct.price > 0 &&
//       newProduct.offerPrice >= 0 &&
//       newProduct.quantity >= 0 &&
//       newProduct.image
//     ) {
//       setProducts([...products, { ...newProduct, id: Date.now() }]);
//       setNewProduct({
//         mainCategory: '',
//         subCategory: '',
//         productName: '',
//         price: 0,
//         offerPrice: 0,
//         quantity: 0,
//         image: '',
//       });
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct({...product});
//   };

//   const handleUpdate = () => {
//     const updatedProducts = products.map((product) =>
//       product.id === editingProduct.id ? editingProduct : product
//     );
//     setProducts(updatedProducts);
//     setEditingProduct(null);
//   };


//   const handleDeleteSelected = () => {
//     const updatedProducts = products.filter((product) => !selectedItems.includes(product.id));
//     setProducts(updatedProducts);
//     setSelectedItems([]);
//   };
//   const handleSelectItem = (productId) => {
//     if (selectedItems.includes(productId)) {
//       setSelectedItems(selectedItems.filter((id) => id !== productId));
//     } else {
//       setSelectedItems([...selectedItems, productId]);
//     }
//   };
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//       const allProductIds = sortedProducts.map((product) => product.id);
//       setSelectedItems(allProductIds);
//     } else {
//       setSelectedItems([]);
//     }
//   };
  
 

//   return (
//     <div className='Products'>
//       <div className="header">
//             <div className="row">
//               <div className="col-lg-2 ps-4 pt-1">
//                 <h2>PRODUCTS</h2>
//               </div>
//               <div className="col-lg-1 hometext pt-2 pe-2">
//                 <Link to="/admin" style={{color:"gray",fontSize:"20px",textDecoration:"none"}}>Home<IoIosArrowForward /></Link>
//               </div>
//               <div className="col-lg-1 text2 pt-2 pe-2">
//                 <Link to="/admin"style={{color:"blue",fontSize:"20px",textDecoration:"none"}}>Product</Link>
//               </div>
//               <div className="col-lg-6"></div>
//               <div className='col-lg-2'>
//              {editingProduct ? (
//            <button className='ProductsUpdatebutton' onClick={handleUpdate}><RxUpdate/></button>
//         ) : (
//           <button className='ProductsCreatebutton'  onClick={handleCreate}><VscAdd/></button>
//          )}
//         <button className='ProductsDeleteSelectedButton' onClick={handleDeleteSelected}> <AiFillDelete/> </button>
//             </div>
//             </div>
//           </div>
//           <hr></hr>
          
//       <div className='ProductsTotal'>
//       <div className='ProductsInputfield'>
//         <div className='Outline'>
//           <ul><div className=' Leftside'> <li>
//         Category Name:
//         <input className="ProductsInput" style={{marginLeft:"11%"}}
//           type="text"
//           placeholder="Main Category"
//           value={newProduct.mainCategory}
//           onChange={(e) => setNewProduct({ ...newProduct, mainCategory: e.target.value })}
//         /></li><li>
//         Sub-Category Name:
//         <input className="ProductsInput" 
//           type="text"
//           placeholder="Subcategory"
//           value={newProduct.subCategory}
//           onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
//         /></li><li>
//         Product Name:
//         <input className="ProductsInput"
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.productName}
//           onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
//         /></li></div>
//         <div className=' Rightside'>
//         <li>
//         Product Price:
//         <input className="ProductsInput"
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//         /></li><li>
//         Offer Price:
//         <input className="ProductsInput" style={{marginLeft:"8%"}}
//           type="number"
//           placeholder="Offer Price"
//           value={newProduct.offerPrice}
//           onChange={(e) => setNewProduct({ ...newProduct, offerPrice: parseFloat(e.target.value) })}
//         /></li><li>
//         Quantity:
//         <input className="ProductsInput" style={{marginLeft:"12%"}}
//           type="number"
//           placeholder="Quantity"
//           value={newProduct.quantity}
//           onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
//         /></li><li>
//         Image:
//         <input className="ProductsInput" style={{marginLeft:"17%"}}
//           type="text"
//           placeholder="Image URL"
//           value={newProduct.image}
//           onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//         /></li> </div></ul>
       
//         </div>
//       </div>
//       <table className='ProductsTable'>
//         <thead className='ProductsHeader'>
//           <tr className='ProductsTr'>
//           <th className='ProductsTh'><input
//   type="checkbox"
//   checked={selectAll}
//   onChange={(e) => handleSelectAll(e.target.checked)}
// />
// </th> 
//            <th className='ProductsTh'>Category</th>
//             <th className='ProductsTh'>Subcategory</th>
//             <th className='ProductsTh'>Product Name</th>
//             <th className='ProductsTh'>Price</th>
//             <th className='ProductsTh'>Offer Price</th>
//             <th className='ProductsTh'>Quantity</th>
//             <th className='ProductsTh'>Image</th>
//             <th className='ProductsTh'>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//         {sortedProducts.map((product, index) => (
//                       <tr className='ProductsTr'key={index}>
//                         <td className='ProductsTd'>
//                         <input
//   type="radio"
//   checked={selectAll || selectedItems.includes(product.id)}
//   onChange={() => handleSelectItem(product.id)}
// />

//               </td>
//               <td className='ProductsTd'>{product.mainCategory}</td>
//               <td className='ProductsTd'>{product.subCategory}</td>
//               <td className='ProductsTd'>{product.productName}</td>
//               <td className='ProductsTd'>${product.price.toFixed(2)}</td>
//               <td className='ProductsTd'>${product.offerPrice.toFixed(2)}</td>
//               <td className='ProductsTd'>{product.quantity}</td>
//               <td className='ProductsTd'>
//                 <img src={product.image} alt={product.productName} style={{ maxWidth: '100px' }} />
//               </td>
//               <td>
//                 <button  className='ProductsEditbutton'onClick={() => handleEdit(product)}><MdEdit/></button>
                
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </div>
//   );
// }

// export default Product;
