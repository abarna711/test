import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Product.css"
import { VscAdd } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function Product() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    mainCategory: '',
    subCategory: '',
    productName: '',
    price: 0,
    offerPrice: 0,
    quantity: 0,
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  useEffect(() => {
    setSortedProducts([...products].sort((a, b) => b.id - a.id));
  }, [products]);
  const handleCreate = () => {
    if (
      newProduct.mainCategory &&
      newProduct.subCategory &&
      newProduct.productName &&
      newProduct.price > 0 &&
      newProduct.offerPrice >= 0 &&
      newProduct.quantity >= 0 &&
      newProduct.image
    ) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({
        mainCategory: '',
        subCategory: '',
        productName: '',
        price: 0,
        offerPrice: 0,
        quantity: 0,
        image: '',
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({...product});
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };


  const handleDeleteSelected = () => {
    const updatedProducts = products.filter((product) => !selectedItems.includes(product.id));
    setProducts(updatedProducts);
    setSelectedItems([]);
  };
  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allProductIds = sortedProducts.map((product) => product.id);
      setSelectedItems(allProductIds);
    } else {
      setSelectedItems([]);
    }
  };
  
 

  return (
    <div className='Products'>
      <div className="header">
            <div className="row">
              <div className="col-lg-3 ps-5 pt-1" style={{fontWeight:"bold"}}>
                <h2>PRODUCTS</h2>
              </div>
              <div className="col-lg-1 hometext pt-2 ">
                <Link to="/admin" style={{color:"gray",fontSize:"20px",textDecoration:"none"}}>Home<IoIosArrowForward /></Link>
              </div>
              <div className="col-lg-1 text2 pt-2 ">
                <Link to="/admin"style={{color:"blue",fontSize:"20px",textDecoration:"none"}}>Product</Link>
              </div>
              <div className="col-lg-5"></div>
              <div className='col-lg-2'>
             {editingProduct ? (
           <button className='ProductsUpdatebutton' onClick={handleUpdate}><RxUpdate/></button>
        ) : (
          <button className='ProductsCreatebutton'  onClick={handleCreate}><VscAdd/></button>
         )}
        <button className='ProductsDeleteSelectedButton' onClick={handleDeleteSelected}> <AiFillDelete/> </button>
            </div>
            </div>
          </div>
          <hr></hr>
          
      <div className='ProductsTotal'>
      <div className='ProductsInputfield row'>
        <div className='Outline'>
          <ul><div className=' Leftside col col-lg-6'> <li>
        Category Name:<br/>
        <input className="ProductsInput"
          type="text"
          placeholder="Category"
          value={newProduct.mainCategory}
          onChange={(e) => setNewProduct({ ...newProduct, mainCategory: e.target.value })}
        /></li><li>
        Sub-Category Name:<br/>
        <input className="ProductsInput" 
          type="text"
          placeholder="Subcategory"
          value={newProduct.subCategory}
          onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
        /></li><li>
        Product Name:<br/>
        <input className="ProductsInput"
          type="text"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
        /></li></div>
        <div className=' Rightside col col-lg-6'>
        <li>
        Product Price:<br/>
        <input className="ProductsInput"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        /></li><li>
        Offer Price:<br/>
        <input className="ProductsInput"
          type="number"
          placeholder="Offer Price"
          value={newProduct.offerPrice}
          onChange={(e) => setNewProduct({ ...newProduct, offerPrice: parseFloat(e.target.value) })}
        /></li><li>
        Quantity:<br/>
        <input className="ProductsInput" 
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
        /></li><li>
        Image:<br/>
        <input className="ProductsInput"
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        /></li> </div></ul>
       
        </div>
      </div>
      <table className='ProductsTable'>
        <thead className='ProductsHeader'>
          <tr className='ProductsTr'>
          <th className='ProductsTh'><input
  type="checkbox"
  checked={selectAll}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>
</th> 
           <th className='ProductsTh'>Category</th>
            <th className='ProductsTh'>Subcategory</th>
            <th className='ProductsTh'>Product Name</th>
            <th className='ProductsTh'>Price</th>
            <th className='ProductsTh'>Offer Price</th>
            <th className='ProductsTh'>Quantity</th>
            <th className='ProductsTh'>Image</th>
            <th className='ProductsTh'>Actions</th>
          </tr>
        </thead>
        <tbody>
        {sortedProducts.map((product, index) => (
                      <tr className='ProductsTr'key={index}>
                        <td className='ProductsTd'>
                        <input
  type="radio"
  checked={selectAll || selectedItems.includes(product.id)}
  onChange={() => handleSelectItem(product.id)}
/>

              </td>
              <td className='ProductsTd'>{product.mainCategory}</td>
              <td className='ProductsTd'>{product.subCategory}</td>
              <td className='ProductsTd'>{product.productName}</td>
              <td className='ProductsTd'>${product.price.toFixed(2)}</td>
              <td className='ProductsTd'>${product.offerPrice.toFixed(2)}</td>
              <td className='ProductsTd'>{product.quantity}</td>
              <td className='ProductsTd'>
                <img src={product.image} alt={product.productName} style={{ maxWidth: '100px' }} />
              </td>
              <td>
                <button  className='ProductsEditbutton'onClick={() => handleEdit(product)}><MdEdit/></button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Product;