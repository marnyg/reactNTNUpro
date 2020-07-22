// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Article, Category, categoryServices } from '../services';
import NavLink from 'react-router-dom/NavLink';

export class Navbar extends Component<{ menuItems: { name: string, path: string }[] }> {
  cats = [];
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-light" href="#">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.menuItems.map((menuItem, i) => (
              <LinkNavbar key={i} text={menuItem.name} link={menuItem.path} />
            ))}
            <DropdownNavbar cats={this.cats.map(e => e.name)} />
          </ul>
        </div>
      </nav>
    );
  }
  mounted() {
    categoryServices.getCategories().then(cats => (this.cats = cats));
    console.log(this.cats);
  }
}

class DropdownNavbar extends Component<{ cats: string[] }> {
  render() {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-light"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Categories
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {this.props.cats.map((cat, i) => {
            return (
              <NavLink key={i} className="dropdown-item" to={'/category/' + cat}>
                {cat}
              </NavLink>
            );
          })}
        </div>
      </li>
    );
  }
}

class LinkNavbar extends Component<{ text: string, link: string }> {
  render() {
    return (
      <li className="nav-item">
        <NavLink className="nav-link text-light" to={this.props.link}>
          {this.props.text}
        </NavLink>
      </li>
    );
  }
}
