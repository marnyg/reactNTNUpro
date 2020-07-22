// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class Article {
  id: number;
  headline: string;
  textBody: string;
  imageLink: string;
  rating: number;
  category: string;

  constructor(headline: string, textBody: string, imageLink: string, rating: number, category: string) {
    this.headline = headline;
    this.imageLink = imageLink;
    this.textBody = textBody;
    this.rating = rating;
    this.category = category;
  }
}

export class Category {
  id: number;
  name: string;
}

class CategoryServices {
  getCategories(): Promise<Category[]> {
    return axios.get('./category');
  }
}

class ArticleService {
  getNewestArticle(): Promise<Article> {
    return axios.get('./newestArticle');
  }
  getArticles(): Promise<Article[]> {
    return axios.get('./article');
  }
  getArticlesWithParams(str: {}): Promise<Article[]> {
    return axios.get('./someArticles', { params: str });
  }
  getArticle(id: number): Promise<Article> {
    console.log('runnig axios.get() on ' + id);
    return axios.get('/article/' + id);
  }
  updateArticle(article: Article): Promise<void> {
    if (article.id != undefined && article.id != -1) {
      console.log('runnig axios.put() on ' + article.id);
      return axios.put('/article/' + article.id, article);
    } else {
      // article.id = Number(null);
      console.log(article.id);

      return axios.put('/article', article);
    }
  }
  deleteArticle(id: number): Promise<void> {
    console.log('runnig axios.delete() on ' + id);
    return axios.delete('/article/' + id);
  }
}

export let articleService = new ArticleService();
export let categoryServices = new CategoryServices();
