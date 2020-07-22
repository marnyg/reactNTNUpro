import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { categoryServices, Article, articleService } from '../services';
import { Card, CardLine } from './card';
import { Navbar } from './navbar';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

let arti = new Article('', '', '', -1, '');
let state = sharedComponentData({ artic: arti });
export class EditArticlePage extends Component {
  articles = [];
  page = 0;

  //did this work

  render() {
    return (
      <div className="row  bg-secondary">
        <div className="col-md-2" />
        <ul className="list-group  col-md-8 bg-dark my-3 pt-3  py-3 mr-md-3 px-3  overflow-hidden">
          {this.articles.map((a, i) => (
            <ListItem key={i} text={a.headline} id={a.id} callback={this.update} />
          ))}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <button type="button" id="prv" onClick={() => this.changePage(false)} className="btn btn-success mx-1">
              {'<'}
            </button>
            {this.page}
            <button type="button" id="nxt" onClick={() => this.changePage(true)} className="btn btn-success mx-1">
              {'>'}
            </button>
          </li>
        </ul>
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
    console.log(this.article);
    articleService
      .getArticlesWithParams({ rating: [1, 2], page: this.page })
      .then(articles => (this.articles = articles))
      .catch((error: Error) => console.log(error));
  }

  update() {
    articleService
      .getArticlesWithParams({ rating: [1, 2], page: this.page })
      .then(articles => (this.articles = articles))
      .catch((error: Error) => console.log(error));
  }
}

export class ListItem extends Component<{ text: string, id: number, callback: fn }> {
  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.props.text}
        <span>
          <button type="button" onClick={this.edit} className="btn btn-success mx-1">
            Edit
          </button>
          <button type="button" id="delete" onClick={this.delete} className="btn btn-danger ">
            Delete
          </button>
        </span>
      </li>
    );
  }

  edit() {
    history.push('/addArticle/' + this.props.id);
  }
  delete() {
    articleService.deleteArticle(this.props.id);
    this.props.callback();
  }
}
