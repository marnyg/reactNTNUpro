import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { Card, CardLine } from './card';
import { Navbar } from './navbar';
import { Home } from './HomePage';
import { CreateArticlePage } from './creatArticle';
import { Article } from '../services';
import { studentService, articleService, categoryServices } from '../services';

export class ArticlePage extends Component<{ match: { params: { id: number } } }> {
  article = null;
  render() {
    if (!this.article) return null;

    console.log(this.article);
    return (
      <div className="row  bg-secondary">
        <div className="col-md-2" />
        <div className="card col-md-8">
          <img className="card-img-top h-50" src={this.article.imageLink} />
          <h2 className="card-title">{this.article.headline}</h2>
          <h6 className="card-subtitle mb-2 text-muted">
            Created At: {this.article.createdAt.substring(0, 19).replace('T', ' ')}
          </h6>
          <p className="card-text">{this.article.textBody}</p>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }

  mounted() {
    articleService
      .getArticle(this.props.match.params.id)
      .then(article => (this.article = article))
      .catch((error: Error) => console.log(error));
  }
}
