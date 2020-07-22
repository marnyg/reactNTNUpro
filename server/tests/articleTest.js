// @flow

import { databaseArticle, databaseCategory, CategoryData, Article, sequelize } from '../src/models';
import Sequelize from 'sequelize';

beforeAll(() => {
  return sequelize.sync({ force: true }).then(() => {
    databaseArticle
      .create(
        new Article(
          'Test sak',
          'Occaecat mollit mollit sunt adipisicing laboris sunt dolore adipisicing eiusmod minim duis duis. Veniam reprehenderit nostrud excepteur elit. Mollit cupidatat commodo veniam sunt minim mollit. Aliqua magna laboris non deserunt culpa commodo incididunt aliqua. Do tempor fugiat est ad consequat id qui laboris labore qui sunt elit. Consequat consectetur culpa id minim aute cillum aliquip excepteur aliqua.',
          'http://gkoonz.com/wp-content/uploads/2013/02/placeholder.jpg',
          1,
          Number(null),
          'mordi'
        )
      )
      .then(() => {
        databaseCategory.create(new CategoryData('mordi'));
      });
  });
});

test('empty test', () => {
  return expect(1 + 2).toBe(3);
});

test('DB test create article', () => {
  expect.assertions(1);
  let b = new Article(
    'Test sak2',
    'Occaecat mollit mollit sunt adipisicing laboris sunt dolore adipisicing eiusmod minim duis duis. Veniam reprehenderit nostrud excepteur elit. Mollit cupidatat commodo veniam sunt minim mollit. Aliqua magna laboris non deserunt culpa commodo incididunt aliqua. Do tempor fugiat est ad consequat id qui laboris labore qui sunt elit. Consequat consectetur culpa id minim aute cillum aliquip excepteur aliqua.',
    'http://gkoonz.com/wp-content/uploads/2013/02/placeholder.jpg',
    1,
    Number(null),
    'mordi'
  );
  return databaseArticle.create(b).then(a => expect(1).toBe(1));
});

test('findOne Article', () => {
  expect.assertions(2);
  return databaseArticle.findOne({ where: { id: 1 } }).then(cat => {
    expect(cat.headline).toMatch('Test sak');
    expect(cat.headline).not.toMatch('somthing');
  });
});

test('DB test create category', () => {
  expect.assertions(1);
  let c = new CategoryData('mordi');
  return databaseCategory.create(c).then(a => expect(1).toBe(1));
});

test('findOne Category', () => {
  expect.assertions(2);
  return databaseCategory.findOne({ where: { id: 1 } }).then(cat => {
    expect(cat.name).toMatch('mordi');
    expect(cat.name).not.toMatch('somthing');
  });
});

test('DB test findAll articles', async () => {
  expect.assertions(1);
  return databaseArticle.findAll().then(a => expect(a.length).toBe(2));
});

test('DB test findAll categoryes', async () => {
  expect.assertions(1);
  return databaseCategory.findAll().then(a => expect(a.length).toBe(2));
});

// let b = new Article(
//     'Test sak',
//     'Occaecat mollit mollit sunt adipisicing laboris sunt dolore adipisicing eiusmod minim duis duis. Veniam reprehenderit nostrud excepteur elit. Mollit cupidatat commodo veniam sunt minim mollit. Aliqua magna laboris non deserunt culpa commodo incididunt aliqua. Do tempor fugiat est ad consequat id qui laboris labore qui sunt elit. Consequat consectetur culpa id minim aute cillum aliquip excepteur aliqua.',
//     'http://gkoonz.com/wp-content/uploads/2013/02/placeholder.jpg',
//     1,
//     Number(null),
//     'mordi'
//   );

// // export let creatArticle = sequelize.sync({ force: production ? false : true }).then(() => {
// //   if (!production)
// //     return databaseArticle
// //       .create(b)
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b))
// //       .then(() => databaseArticle.create(b));
// });
