import React from 'react';
import '../styles/SidebarComponentStyle.css';
import {NavLink } from 'react-router-dom';
import {Navbar, Icon} from 'react-materialize';

export default () => (
<Navbar brand={<Icon>info</Icon>} left className="nav-wrapper">
  <li><NavLink to="/">Add Product</NavLink></li>
  <li><NavLink to="/products">Products List</NavLink></li>
  <li><NavLink to="/history">History</NavLink></li>
  <li><NavLink to="/register">Register</NavLink></li>
  <li><NavLink to="/login">Login</NavLink></li>
</Navbar>
)
