//@ flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Component, sharedComponentData } from 'react-simplified';
import { categoryServices, Article, articleService } from '../services';
import { Card, CardLine } from './card';
import { Navbar } from './navbar';
import createHashHistory from 'history/createHashHistory';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

let arti = new Article('', '', '', 1, '');
let state = sharedComponentData({ artic: arti });
export class CreateArticlePage extends Component {
  categories = [];

  render() {
    return (
      <div ref="form" className="row  bg-secondary">
        <div className="col-md-2" />
        <form
          ref="realform"
          className=" flex-column d-flex  col-md-8 bg-dark my-3 pt-3  py-3 mr-md-3 px-3  text-light overflow-hidden"
        >
          <FormTextAreaHeadline title="Title" />
          <FormTextAreaImage title="Image Link" />
          <FormTextAreaBody title="Content" />
          <FormDropdownSelect text="Importance rating" choises={[1, 2]} value={'asd'} />
          <FormDropdownSelectCat text="Category" choises={this.categories.map(e => e.name)} />
          <button className="btn btn-primary" type="submit" onClick={this.save}>
            Submit
          </button>
        </form>
        <div className="col-md-2" />
      </div>
    );
  }
  mounted() {
    categoryServices
      .getCategories()
      .then(cats => (this.categories = cats))
      .catch((error: Error) => console.log(error));

    if (this.props.match.params.id != undefined) {
      articleService
        .getArticle(this.props.match.params.id)
        .then(res => {
          console.log(res);

          state.artic = res;
          this.forceUpdate();
        })
        .catch((error: Error) => console.log(error));
    }
  }

  componentWillUnmount() {
    state.artic = new Article('', '', '', 1, '');
    console.log('Asdasdsa');
  }

  save() {
    console.log(this.test);

    if (this.refs.realform.checkValidity()) {
      console.log('saved!!!');
      console.log(state.artic);
      articleService.updateArticle(state.artic);
      history.push('/');
    }
  }
}

class FormFileinput extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleInputFile">File input</label>
        <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
        <small id="fileHelp" className="form-text text-muted">
          This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a
          new line.
        </small>
      </div>
    );
  }
}

class FormDropdownSelect extends Component<{ text: string, choises: string[], value: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleSelect1">{this.props.text}</label>
        <select
          required
          className="form-control"
          id="exampleSelect1"
          defaultValue={this.props.value}
          onChange={event => {
            state.artic.rating = Number(event.target.value);
            console.log(state.artic);
          }}
        >
          {this.props.choises.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </select>
      </div>
    );
  }
}

class FormDropdownSelectCat extends Component<{ text: string, choises: string[], value: string, callback: fn }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleSelect1">{this.props.text}</label>
        <select
          required
          className="form-control"
          id="exampleSelect1"
          defaultValue={state.artic.category}
          onClick={event => {
            console.log('asdasdasdasdasdasdasdasdasdasdasda');
            console.log(state.artic.category);

            state.artic.category = event.target.value;
          }}
        >
          <option>{state.artic.category}</option>
          {this.props.choises.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
class FormTextAreaSummry extends Component<{ tilte: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleTextarea">{this.props.title}</label>
        <textarea
          required
          className="form-control"
          id="exampleTextarea"
          rows="1"
          value={state.artic.summar}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            state.artic.summary = event.target.value;
          }}
        />
      </div>
    );
  }
}

class FormTextAreaImage extends Component<{ tilte: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleTextarea">{this.props.title}</label>
        <textarea
          required
          type="tex "
          className="form-control"
          id="exampleTextarea"
          rows="1"
          value={state.artic.imageLink}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // this.props.value = event.target.value;
            state.artic.imageLink = event.target.value;
          }}
        />
      </div>
    );
  }
}

class FormTextAreaHeadline extends Component<{ tilte: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleTextarea">{this.props.title}</label>
        <textarea
          required
          className="form-control"
          id="exampleTextarea"
          rows="1"
          value={state.artic.headline}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // this.props.value = event.target.value;
            state.artic.headline = event.target.value;
          }}
        />
      </div>
    );
  }
}
class FormTextAreaBody extends Component<{ tilte: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleTextarea">{this.props.title}</label>
        <textarea
          required
          className="form-control"
          id="exampleTextarea"
          rows="3"
          value={state.artic.textBody}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // this.props.value = event.target.value;
            state.artic.textBody = event.target.value;
          }}
        />
      </div>
    );
  }
}

class FormCheckBoxes extends Component<{ titles: string[], tilte: String }> {
  render() {
    return (
      <div className="form-group" id="tst">
        <label htmlFor="tst">{this.props.title}</label>
        {this.props.titles.map((title, i) => (
          <div key={i} className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              {title.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

class Forme extends Component {
  render() {
    return (
      <form>
        <FormDropdownSelect />
        <FormTextArea />
        <FormCheckBoxes titles={['asd', 'dsad', 'cata', 'memes']} />
        <FormFileinput />
        {/* <FormRadioButtons /> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
