import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Product.css"
import { VscAdd } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';

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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});



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
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        const uniqueCategories = removeDuplicateCategories(response.data.categories);
        setCategories(uniqueCategories);
  
        const subCategoryMap = {};
        uniqueCategories.forEach(category => {
          subCategoryMap[category.category] = category.subcategories;
        });
        setSubCategories(subCategoryMap);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    fetchCategories();
  }, []); 
  const removeDuplicateCategories= (categories) => {
    const uniqueCategories = categories.reduce((unique, category) => {
      const existing = unique.find((c) => c.category === category.category);
      if (!existing) {
        unique.push(category);
      }
      return unique;
    }, []);
    return uniqueCategories;
  };
 
  const getSubcategories = (selectedCategory) => {
    const category = categories.find((cat) => cat.category === selectedCategory);
    return category ? category.subcategories : [];
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
          <ul><div className=' Leftside col col-lg-6'>
          <li>
    Category Name:<br />
  <select
  className="ProductsInput"
  value={newProduct.mainCategory}
  onChange={(e) => {
    const selectedCategory = e.target.value;
    const subcategories = getSubcategories(selectedCategory);
    setNewProduct({
      ...newProduct,
      mainCategory: selectedCategory,
      subCategory: '',
    });
    setSubCategories(subcategories);
  }}
>
  <option value="">Select Category</option>
  {(() => {
    const options = [];
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        options.push(
          <option key={categories[i]._id} value={categories[i].category}>
            {categories[i].category}
          </option>
        );
      }
    }
    return options;
  })()}
</select>
      </li>
      Subcategory Name:<br />

      <li><select
      className="ProductsInput"
      value={newProduct.subCategory}
      onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
    >
      <option value="">Select Subcategory</option>
      {(() => {
        const subCategories = getSubcategories(newProduct.mainCategory);
        const options = [];
        if (subCategories && subCategories.length > 0) {
          for (let i = 0; i < subCategories.length; i++) {
            options.push(
              <option key={subCategories[i]} value={subCategories[i]}>
                {subCategories[i]}
              </option>
            );
          }
        }
        return options;
      })()}
    </select>
</li>
          <li>
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
<div className='card mt-5 mb-4' style={{width:"95%"}}>
      <table className='ProductsTable' style={{}}>
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
    </div>
  );
}

export default Product;