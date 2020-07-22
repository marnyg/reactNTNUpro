// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Article, Category, categoryServices } from '../services';
import NavLink from 'react-router-dom/NavLink';

export class Card extends Component<{ headline: string, imageLink: string, textBody: string, id: number }> {
  render() {
    return (
      <div className=" card bg-dark my-3 pt-3  py-3 mr-md-3 px-3 text-center text-light overflow-hidden">
        <NavLink to={'/article/' + this.props.id}>
          <img className="card-img-top" src={this.props.imageLink} />
          <h5 className="card-title">{this.props.headline}</h5>
        </NavLink>
        <p className="card-text">{this.props.textBody.substr(0, 100)}...</p>
      </div>
    );
  }
}

export class CardLine extends Component<{ cards: Article[] }> {
  render() {
    return (
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        {this.props.cards.map((e, i) => (
          <Card headline={e.headline} textBody={e.textBody} imageLink={e.imageLink} id={e.id} key={i} />
        ))}
      </div>
    );
  }
}
