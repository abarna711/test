import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sidebar/SideMenu.css';
import { FaAngleDown,FaShoppingCart } from 'react-icons/fa';
import {AiFillDashboard} from 'react-icons/ai';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {FaDesktop} from 'react-icons/fa6';
import {RiArrowRightDoubleFill} from 'react-icons/ri';

function SideMenu() {
  const [isCatalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [isSalesDropdownOpen, setSalesDropdownOpen] = useState(false);

  const toggleCatalogDropdown = () => {
    setCatalogDropdownOpen(!isCatalogDropdownOpen);
  };

  const toggleContactDropdown = () => {
    setContactDropdownOpen(!isContactDropdownOpen);
  };
  const toggleSalesDropdown = () => {
    setSalesDropdownOpen(!isSalesDropdownOpen);
  };

  return (
    <div className="side-menu mt-5">
      <ul>
        <li className='mt-2'>
         <Link to="/admin"><AiFillDashboard/> Dashboard</Link>
        </li>
        <li className='mt-4'>
          <Link  onClick={toggleCatalogDropdown}>
           <BsFillBookmarkFill/> Catalog <FaAngleDown className='downicon' />
          </Link>
          {isCatalogDropdownOpen && (
            <ul className="catalog-dropdown pt-3">
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/catalog/categories">Categories</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="/catalog/product">Product</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="/catalog/filters">Filters</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='mt-4'>
          <Link  onClick={toggleContactDropdown}>
          <FaDesktop className='me-1'/>  Design <FaAngleDown className='downicon'/>
          </Link>
          {isContactDropdownOpen && (
            <ul className="contact-dropdown pt-3">
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/design/layout">Layouts</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/design/theme">Theme Editor</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/design/lanuage">Language Editor</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='mt-4'>
          <Link  onClick={toggleSalesDropdown}>
          <FaShoppingCart className=''/> Sales <FaAngleDown className='downicon' style={{marginLeft:"130px"}}/>
          </Link>
          {isSalesDropdownOpen && (
            <ul className="contact-dropdown pt-3">
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/sales/order">Orders</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/sales/recurring">Recurring Orders</Link>
              </li>
              <li>
              <RiArrowRightDoubleFill/><Link to="admin/sales/return">Returns</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}


export default SideMenu;


