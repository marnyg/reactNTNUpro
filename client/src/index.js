// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { Card, CardLine } from './components/card';
import { Navbar } from './components/navbar';
import { Home } from './components/HomePage';
import { CreateArticlePage } from './components/creatArticle';
import { EditArticlePage } from './components/editArticle';
import { ArticlePage } from './components/article';
import { LiveFeed } from './components/liveFeed';
import { articleService, categoryServices, Article, Category } from './services';
import createHashHistory from 'history/createHashHistory';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

let asd = [{ name: 'Edit Articles', path: '/editArticle' }, { name: 'Add new Article', path: '/addArticle' }];

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div className="bg-secondary  h-100 ">
        <Navbar menuItems={asd} />
        <LiveFeed />
        <Route exact path="" component={Home} />
        <Route exact path="/addArticle" component={CreateArticlePage} />
        <Route path="/addArticle/:id" component={CreateArticlePage} />
        <Route path="/editArticle" component={EditArticlePage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/category/:cat" component={Home} />
        <footer className="page-footer bg-dark font-small blue">
          <div className="footer bg-dark text-center py-3 ">
            © 2018 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/"> NTNU.no</a>
          </div>
        </footer>
      </div>
    </HashRouter>,
    root
  );
