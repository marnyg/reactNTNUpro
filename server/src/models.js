// @flow

import Sequelize from 'sequelize';
import type { Model } from 'sequelize';

export let sequelize = new Sequelize(
  process.env.CI ? 'testDB' : 'mariunyg',
  process.env.CI ? 'root' : 'mariunyg',
  'Y8tBCRRT',
  {
    host: process.env.CI ? 'mysql' : 'mysql.stud.iie.ntnu.no',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

let production = process.env.NODE_ENV === 'production';

  export class Article {
    id: number;
  headline: string;
  textBody: string;
  imageLink: string;
  rating: number;
  category: string;

  constructor(hl: string, txt: string, img: string, rating: number, id: number, category: string) {
    this.headline = hl;
    this.textBody = txt;
    this.imageLink = img;
    this.rating = rating;
    this.id = id;
    this.category = category;
  }

  static isValidReqest(req: express$Request) {
    return (
      req.body &&
      typeof req.body.headline == 'string' &&
      typeof req.body.textBody == 'string' &&
      typeof req.body.rating == 'number' &&
      typeof req.body.imageLink == 'string' &&
      typeof req.body.category == 'string'
    );
  }
}
export class CategoryData {
  id: number;
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
// let b = new Article(
//   'Test sak',
//   'Occaecat mollit mollit sunt adipisicing laboris sunt dolore adipisicing eiusmod minim duis duis. Veniam reprehenderit nostrud excepteur elit. Mollit cupidatat commodo veniam sunt minim mollit. Aliqua magna laboris non deserunt culpa commodo incididunt aliqua. Do tempor fugiat est ad consequat id qui laboris labore qui sunt elit. Consequat consectetur culpa id minim aute cillum aliquip excepteur aliqua.',
//   'http://gkoonz.com/wp-content/uploads/2013/02/placeholder.jpg',
//   1,
//   Number(null),
//   'Lokalt'
// );

// sequelize.sync({ force: production ? false : true }).then(() => {
//   databaseArticle
//     .create(b)
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .then(() => databaseArticle.create(b))
//     .catch(e => console.error(e.stack));
//   databaseCategory
//     .create(new CategoryData('Lokalt'))
//     .then(() => databaseCategory.create(new CategoryData('Globalt')))
//     .then(() => databaseCategory.create(new CategoryData('Morro')))
//     .then(() => databaseCategory.create(new CategoryData('Ikke Morro')))
//     .catch(e => console.error(e.stack));
// });
export let databaseCategory: Class<Model<CategoryData>> = sequelize.define('Category', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});
export let databaseArticle: Class<Model<Article>> = sequelize.define('Article', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  headline: Sequelize.STRING,
  textBody: Sequelize.TEXT,
  imageLink: Sequelize.STRING,
  category: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

//
