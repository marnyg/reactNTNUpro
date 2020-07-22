// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import Sequelize from 'sequelize';
import { sequelize, databaseArticle, databaseCategory, Article } from './models.js';

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

app.get('/article', (req: Request, res: Response) => {
  console.log(req.query);
  return databaseArticle.findAll().then(students => res.send(students));
});
app.get('/newestArticle', (req: Request, res: Response) => {
  console.log('got get request');
  return databaseArticle.findOne({ order: Sequelize.literal('createdAt DESC') }).then(students => res.send(students));
});
app.get('/someArticles', (req: Request, res: Response) => {
  console.log(req.query);
  // if(req.body.filter){
  return databaseArticle
    .findAll({
      where: {
        [Sequelize.Op.or]: [{ category: req.query.categori }, { rating: req.query.rating }]
      },
      offset: 10 * Number(req.query.page),
      limit: 10 * Number(req.query.page) + 10
    })
    .then(students => res.send(students));
  // }else
});

app.get('/article/:id', (req: Request, res: Response) => {
  console.log('got get request');
  return databaseArticle.findOne({ where: { id: Number(req.params.id) } }).then(students => res.send(students));
});

app.put('/article/:id', (req: Request, res: Response) => {
  console.log(req);
  // if (!Article.isValidReqest(req)) return res.sendStatus(400);
  // sd.
  return databaseArticle
    .update(
      new Article(
        req.body.headline,
        req.body.textBody,
        req.body.imageLink,
        req.body.rating,
        req.params.id,
        req.body.category
      ),
      {
        where: { id: req.params.id }
      }
    )
    .then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/article', (req: Request, res: Response) => {
  console.log(req.body);
  // if (!Article.isValidReqest(req)) return res.sendStatus(400);

  console.log(req);
  return databaseArticle
    .create(
      new Article(
        req.body.headline,
        req.body.textBody,
        req.body.imageLink,
        req.body.rating,
        undefined,
        req.body.category
      )
    )
    .then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/article/:id', (req: Request, res: Response) => {
  return databaseArticle.destroy({ where: { id: req.params.id } });
});

app.get('/category', (req: Request, res: Response) => {
  return databaseCategory.findAll().then(students => res.send(students));
});

if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
