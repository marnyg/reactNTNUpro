//@ flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, articleService, Article } from '../services';
import { Card, CardLine } from './card';
import { Navbar } from './navbar';

export class Home extends Component {
  articles: Article;
  articles = [];
  page = 0;
  interval = setInterval(0, {});
  render() {
    return (
      <div className="row   bg-secondary">
        <div className="col-md-2" />
        <div className="col-md-8">
          <li className="list-group-item text-light bg-dark d-flex justify-content-between align-items-center">
            <button type="button" id="prv" onClick={() => this.changePage(false)} className="btn btn-success mx-1">
              {'<'}
            </button>
            {this.page}
            <button type="button" id="nxt" onClick={() => this.changePage(true)} className="btn btn-success mx-1">
              {'>'}
            </button>
          </li>
          {chunk(this.articles, 3).map((e, i) => (
            <CardLine cards={e} key={i} />
          ))}
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
  changePage(increas: boolean) {
    if (increas) {
      this.page++;
    } else {
      if (this.page > 0) this.page--;
    }
    this.update();
  }
  mounted() {
    if (this.props.match.params.cat != undefined) {
      articleService
        .getArticlesWithParams({ categori: this.props.match.params.cat, page: this.page })
        .then(articles => (this.articles = articles))
        .catch((error: Error) => console.log(error));
    } else {
      articleService
        .getArticlesWithParams({ rating: 1, page: this.page })
        .then(articles => (this.articles = articles))
        .catch((error: Error) => console.log(error));
    }
    this.interval = setInterval(this.update, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  update() {
    if (this.props.match.params.cat != undefined) {
      articleService
        .getArticlesWithParams({ categori: this.props.match.params.cat, page: this.page })
        .then(articles => (this.articles = articles))
        .catch((error: Error) => console.log(error));
    } else {
      articleService
        .getArticlesWithParams({ rating: 1, page: this.page })
        .then(articles => (this.articles = articles))
        .catch((error: Error) => console.log(error));
    }
  }
}

function chunk(arr, chunkSize) {
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize) R.push(arr.slice(i, i + chunkSize));
  return R;
}
