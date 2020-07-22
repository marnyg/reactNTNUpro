import * as React from 'react';
import { Component } from 'react-simplified';
import { Article, articleService } from '../services';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class LiveFeed extends Component {
  articles = [];
  animatedtexts = [];
  num = 0;
  offset = 200;
  render() {
    return <canvas ref="canvas" height="20px" />;
  }

  initCanvas() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    window.addEventListener('resize', this.resizeCanvas, false);

    this.canvas.addEventListener('click', this.on_click, false);
    console.log(this.canvas);
  }

  on_click(e) {
    let clickpos = e.layerX;
    let asd = this.animatedtexts.find(
      aText => aText.xposStart - this.num < clickpos && aText.xposEnd - this.num > clickpos
    );
    if (asd) {
      history.push('/article/' + asd.articleId);
      console.log(asd);
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearCanvis() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    this.clearCanvis();
    this.ctx.fillStyle = 'white';

    this.animatedtexts.map(aText => {
      if (aText.xposEnd > this.num) {
        this.ctx.fillText(aText.text, aText.xposStart - this.num, 13);
        this.num++;
      } else {
        this.num = 0;
        this.setArticles();
      }
    });
  }

  prepAniate() {
    this.getNext = false;
    this.animatedtexts = this.articles.map((a, i) => {
      let txt = a.createdAt.substring(11, 19) + ': ' + a.headline;
      let startx = this.canvas.width - this.num + this.offset * i;
      let endx = this.ctx.measureText(txt).width + startx;
      this.getNext = false;
      return new AnimatedText(a.id, startx, endx, txt);
    });
  }
  setArticles(articles) {
    articleService
      .getNewestArticle()
      .then(articl => (this.articles[0] = articl))
      .then(() => this.prepAniate())
      .catch((error: Error) => console.log(error));
  }

  componentDidMount() {
    this.initCanvas();
    this.setArticles();
    setInterval(this.animate, 20);
  }
}
class AnimatedText {
  xposStart: number;
  xposEnd: number;
  articleId: number;
  text: string;

  constructor(id: number, start: number, end: number, txt: string) {
    this.articleId = id;
    this.xposStart = start;
    this.xposEnd = end;
    this.text = txt;
  }
}
